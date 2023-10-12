import { Campaign } from "@/app/(client)/campaign/data-table/components/columns";
import { db } from "@/lib/db";
import { CampaignStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getAllProductsForUser } from "@/lib/dbAction";

export const productRouter = router({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    const products = await getAllProductsForUser(userId);
    return products;
  }),
  deleteProduct: privateProcedure
    .input(
      z.object({
        productIds: z
          .string({
            required_error: "product Id is required to delete a product",
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { productIds } = input;
      const products = await db.product.findMany({
        where: {
          ownerId: userId,
          productId: {
            in: productIds,
          },
        },
      });
      if (!products)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });

      const deletedProduct = await db.product.deleteMany({
        where: {
          ownerId: userId,
          productId: {
            in: productIds,
          },
        },
      });
      const deletedCount = deletedProduct.count;
      return {
        success: "true",
        deletedProduct,
        deletedCount,
      };
    }),
});

export type ProductRouter = typeof productRouter;
