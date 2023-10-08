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
  test: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    return 4;
  }),
});

export type ProductRouter = typeof productRouter;
