import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { absoluteUrl } from "@/lib/utils";
import { getAuthSession } from "@/lib/authOption";
import { Session } from "next-auth";
import { db } from "@/lib/db";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const session = await getAuthSession();
    const { user } = session as Session;

    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        },
      });
    }

    return { success: true };
  }),

  getCampaign: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    // Retrieve the 'products' array property from the result
    const campaignsData = await db.campaign.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        campaignId: true,
        description: true,
        name: true,
        status: true,
        leadsRequirements: true,
        targetCountry: true,
        createdAt: true,
        product: {
          select: {
            productId: true,
            name: true,
            category: true,
            description: true,
            price: true,
            images: true,
            createdAt: true,
          },
        },
      },
    });

    return campaignsData;
  }),
});

export type AppRouter = typeof appRouter;
