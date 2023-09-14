import { db } from "@/lib/db";
import { senActivationEmail } from "@/lib/emails/activation";
import { userSchema } from "@/schema/userSchema";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export async function POST(req: NextRequest, res: NextResponse) {
  const { confirmPassword, ...body } = await req.json();
  const result = userSchema.safeParse(body);
  if (!result.success) {
    const formatted = result.error.format();
    return NextResponse.json(
      {
        errors: formatted,
      },
      {
        status: 400,
      }
    );
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (existingUser) {
    return NextResponse.json(
      {
        errors: "User with this email already exist",
      },
      {
        status: 409,
      }
    );
  }

  try {
    const hashPassword = await hash(body.password, 12);
    const newUser = await db.user.create({
      data: { ...body, password: hashPassword },
    });
    const { password, emailVerified, ...userCreated } = newUser;
    const token = await db.activateToken.create({
      data: {
        userId: newUser.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      },
    });

    const sendMail = await senActivationEmail({
      name: result.data.name,
      email: result.data.email,
      verifyTokenUrl: `${process.env.BASE_URL}/api/auth/activate/verify?token=${token.token}`,
    });
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        callback: "/login",
        user: { ...userCreated },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        errors: "Something Went Wrong",
      },
      {
        status: 500,
      }
    );
  }
}
