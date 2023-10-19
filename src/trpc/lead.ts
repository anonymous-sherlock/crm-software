import { db } from "@/lib/db";
import { LeadsFormSchema, LeadsPayload } from "@/schema/LeadSchema";
import { LeadStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import { z } from "zod";
import { privateProcedure, router } from "./trpc";

export const leadRouter = router({
  getAll: privateProcedure.query(async ({ ctx, input }) => {
    const { userId } = ctx;
    const Leads = await db.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: userId,
      },
      include: {
        campaign: {
          select: {
            name: true,
          },
        },
      },
    });
    return Leads;
  }),
  getCampaignLeads: privateProcedure
    .input(
      z.object({
        campaignId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { campaignId } = input;

      const leads = await db.lead.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
          campaingId: campaignId,
        },
        include: {
          campaign: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      return leads;
    }),
  updateStatus: privateProcedure
    .input(
      z.object({
        leadId: z.string({
          required_error: "Lead id is required to update a lead",
        }),
        leadStatus: z.nativeEnum(LeadStatus),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { leadId, leadStatus } = input;
      const lead = await db.lead.findFirst({
        where: {
          userId: userId,
          id: leadId,
        },
      });
      if (!lead) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Lead with this id not found",
        });
      }
      const updatedLead = await db.lead.update({
        where: {
          userId: userId,
          id: leadId,
        },
        data: {
          status: leadStatus,
        },
      });
      return {
        success: "true",
        updatedLead,
      };
    }),
  deleteLead: privateProcedure
    .input(
      z.object({
        leadIds: z
          .string({
            required_error: "Lead Id is required to delete a Lead",
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { leadIds } = input;
      const leads = await db.lead.findMany({
        where: {
          userId: userId,
          id: {
            in: leadIds,
          },
        },
      });
      if (!leads)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Leads not found",
        });

      const deletedLead = await db.lead.deleteMany({
        where: {
          userId: userId,
          id: {
            in: leadIds,
          },
        },
      });
      const deletedCount = deletedLead.count;
      return {
        success: "true",
        deletedLead,
        deletedCount,
      };
    }),

  add: privateProcedure
    .input(LeadsFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { name, phone, address, campaignCode } = input;
      const userApiKey = await db.apiKey.findFirst({
        where: {
          userId,
          enabled: true,
        },
      });
      const userBearerKey = await db.bearerToken.findFirst({
        where: {
          userId,
          active: true,
        },
      });
      if (!userApiKey) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Api Key not Found Please generate a new key from profile",
        });
      }
      const payload: LeadsPayload = {
        campaignCode,
        userId,
        data: {
          name,
          phone,
          address,
        },
      };
      console.log("before data");
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/V1/order/leads",
          payload,
          {
            headers: {
              API_Key: userApiKey.key,
              Authorization: `Bearer ${userBearerKey?.key}`,
            },
          }
        );
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }

      return true;
    }),
});

export type LeadRouter = typeof leadRouter;
