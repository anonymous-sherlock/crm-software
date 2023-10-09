import { Campaign } from "@/app/(client)/campaign/data-table/components/columns";
import { db } from "@/lib/db";
import { CampaignStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedure, router } from "./trpc";

export const campaignRouter = router({
  updateStatus: privateProcedure
    .input(
      z.object({
        campaignId: z.string({
          required_error: "product Id is required to delete a product",
        }),
        campaignStatus: z.nativeEnum(CampaignStatus),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { campaignId, campaignStatus } = input;
      const campaign = await db.campaign.findFirst({
        where: {
          userId: userId,
          campaignId: campaignId,
        },
      });
      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign with this id not found",
        });
      }
      const updatedCampaign = await db.campaign.update({
        where: {
          userId: userId,
          campaignId: campaignId,
        },
        data: {
          status: campaignStatus,
        },
      });
      return {
        success: "true",
        updatedCampaign,
      };
    }),
  getAll: privateProcedure.query(async ({ ctx }) => {
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
    const mappedCampaignsData: Campaign[] = campaignsData.map((campaign) => {
      return {
        campaignId: campaign.campaignId,
        campaignName: campaign.name,
        description: campaign.description,
        status: campaign.status,
        targetCountry: campaign.targetCountry,
        product: {
          productId: campaign.product?.productId ?? "",
          name: campaign.product?.name ?? "",
          description: campaign.product?.description ?? "",
          price: Number(campaign.product?.price) ?? "",
          category: campaign.product?.category ?? "",
          images: campaign.product?.images ?? [], // Add nullish coalescing operator
          createdAt: campaign.product?.createdAt!,
        },
      };
    });

    return mappedCampaignsData;
  }),
  copyCampaign: privateProcedure
    .input(
      z.object({
        campaignId: z.string({
          required_error: "product Id is required to delete a product",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { campaignId } = input;
      const campaign = await db.campaign.findFirst({
        where: {
          userId: userId,
          campaignId: campaignId,
        },
      });
      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign with this id not found",
        });
      }

      const copiedCampaign = db.campaign.create({
        data: {
          campaignId: campaign.campaignId,
          name: campaign.name,
          description: campaign.description,
          callCenterTeamSize: campaign.callCenterTeamSize,
          leadsRequirements: campaign.leadsRequirements,
          targetAge: JSON.stringify(campaign.targetAge),
          targetCountry: campaign.targetCountry,
          targetGender: campaign.targetGender,
          trafficSource: campaign.trafficSource,
          workingDays: JSON.stringify(campaign.workingDays),
          workingHours: JSON.stringify(campaign.workingHours),
          productId: campaign.productId,
          userId: campaign.userId,
        }
      })

      return {
        success: "true",
        copiedCampaign
      };
    }),
});

export type CampaignRouter = typeof campaignRouter;
