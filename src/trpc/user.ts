import { db } from "@/lib/db";
import { senActivationEmail } from "@/lib/emails/activation";
import { registerFormSchema } from "@/schema/authFormSchema";
import { TRPCError, inferRouterOutputs } from "@trpc/server";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { nanoid } from "nanoid";
import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";

export const userRouter = router({
  getProduct: privateProcedure
    .input(
      z.object({
        productId: z.string({
          required_error: "product Id is required to delete a product",
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { productId } = input;
      const product = await db.product.findMany({
        where: {
          ownerId: userId,
          productId: productId,
        },
      });
      if (!product)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });

      return {
        success: "true",
        product,
      };
    }),
  add: publicProcedure.input(registerFormSchema).mutation(async ({ input }) => {
    const { name, email, password, confirmPassword } = input;
    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User with this email already exist",
      });
    }
    const hashPassword = await hash(password, 16);
    const newUser = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        apiKeys: {
          create: {
            key: nanoid(32),
          },
        },
        BearerToken: {
          create: {
            key: nanoid(12),
          },
        },
      },
    });
    const token = await db.activateToken.create({
      data: {
        userId: newUser.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      },
    });
    const sendMail = await senActivationEmail({
      name: newUser.name,
      email: newUser.email,
      verifyTokenUrl: `${process.env.BASE_URL}/api/auth/activate/verify?token=${token.token}`,
    });

    return {
      success: true,
      message: "User created successfully",
      callback: "/login",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }),

  get: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    const user = db.user.findFirst({
      where: {
        id: userId,
      },

      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        active: true,
        apiKeys: true,
        BearerToken: true,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" })
    }
    return user;
  }),
  generateApi: privateProcedure.mutation(async ({ ctx }) => {
    const { userId } = ctx;
    const user = db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    const existingApiKey = await db.apiKey.findFirst({
      where: { userId: userId, enabled: true },
    })

    if (existingApiKey) {
      const data = await db.$transaction([
        db.apiKey.update(
          {
            where: { id: existingApiKey.id },
            data: {
              enabled: false
            }
          }
        ),

        db.apiKey.create({
          data: {
            key: nanoid(32),
            enabled: true,
            userId: userId,
          }
        })
      ])

      return { ...data[1] }
    }
    const newApiKey = db.apiKey.create({
      data: {
        key: nanoid(32),
        enabled: true,
        userId: userId,
      }
    })

    return newApiKey
  }
  ),
  generateBearerToken: privateProcedure.mutation(async ({ ctx }) => {
    const { userId } = ctx;
    const user = db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    const existingBearerToken = await db.bearerToken.findFirst({
      where: { userId: userId, active: true },
    })

    if (existingBearerToken) {
      const data = await db.$transaction([
        db.bearerToken.update(
          {
            where: { id: existingBearerToken.id },
            data: {
              active: false
            }
          }
        ),

        db.bearerToken.create({
          data: {
            key: `${nanoid(32)}${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
            active: true,
            userId: userId,
          }
        })
      ])

      return { ...data[1] }
    }
    const newBearerKey = db.bearerToken.create({
      data: {
        key: `${nanoid(32)}${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        active: true,
        userId: userId,
      }
    })

    return newBearerKey
  }
  )
});

export type UserRouter = typeof userRouter;
