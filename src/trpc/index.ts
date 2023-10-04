import { TRPCError } from "@trpc/server";
import { privateProcedure, publicProcedure, router } from "./trpc";

import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { Session } from "next-auth";
import { z } from "zod";
import { campaignFormSchema } from "@/schema/campaignSchema";
import { generateCampaignID } from "@/lib/utils";
import { getAllProductsForUser } from "@/lib/dbAction";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  // products
  getProducts: privateProcedure.query(async ({ ctx }) => {

    const { userId } = ctx;
    const products = await getAllProductsForUser(userId);

    return products
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
      leadsRequirements: campaign.leadsRequirements,
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
    return campaigns
  })
  ,
  createCampaign: privateProcedure
    .input(
      z.object({
        campaign: campaignFormSchema, // Use Campaign as the input type
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { campaignName,
        campaignDescription,
        product,
        callCenterTeamSize,
        leadsRequirements,
        targetAge,
        targetCountry,
        targetGender,
        targetRegion,
        trafficSource,
        workingDays,
        workingHours } = input.campaign
      const campaignID = generateCampaignID();


      const newCampaign = await db.campaign.create({
        data: {
          name: campaignName,
          description: campaignDescription,
          callCenterTeamSize,
          leadsRequirements,
          targetCountry,
          targetGender: targetGender === "female" ? "Female" : "Male",
          trafficSource: trafficSource,
          workingDays,
          workingHours,
          targetAge: targetAge,
          targetRegion: {
            createMany: {
              data: (targetRegion || []).map((region) => ({
                regionName: region.toString(),
              })),
            },
          },
          campaignId: campaignID,
          user: {
            connect: {
              id: userId,
            },
          },
          product: {
            connect: {
              productId: product,
            },
          },
        },
      });
      return {
        success: "true",
        campaign: newCampaign
      };
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
