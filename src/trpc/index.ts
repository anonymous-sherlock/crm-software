import { inferRouterOutputs } from "@trpc/server";
import { privateProcedure, router } from "./trpc";

import { db } from "@/lib/db";
import { getAllProductsForUser } from "@/lib/dbAction";
import { campaignRouter } from "./campaign";
import { leadRouter } from "./lead";
import { productRouter } from "./product";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  campaign: campaignRouter,
  product: productRouter,
  lead: leadRouter,
  // products
  getProducts: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    const products = await getAllProductsForUser(userId);

    return products;
  }),

  // campaigns
  getCampaigns: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
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
    const campaigns = campaignsData.map((campaign) => ({
      campaignId: campaign.campaignId,
      campaignName: campaign.name,
      description: campaign.description ?? "",
      status: campaign.status,
      targetCountry: campaign.targetCountry,
      product: {
        productId: campaign.product?.productId ?? "",
        name: campaign.product?.name ?? "", // Add the nullish coalescing operator here
        category: campaign.product?.category,
        description: campaign.product?.description ?? "",
        price: campaign.product?.price,
        images: campaign.product?.images ?? [],
        createdAt: campaign.product?.createdAt ?? "",
      },
    }));
    return campaigns;
  }),


  getCampaignForLeads: privateProcedure.query(async ({ ctx }) => {
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
export type RouterOutputs = inferRouterOutputs<AppRouter>;