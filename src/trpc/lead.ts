import { Campaign } from "@/app/(client)/campaign/data-table/components/columns";
import { db } from "@/lib/db";
import { CampaignStatus, LeadStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getAllProductsForUser } from "@/lib/dbAction";

export const leadRouter = router({
    getAll: privateProcedure.query(async ({ ctx, input }) => {
        const { userId } = ctx;
        const Leads = await db.lead.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                userId: userId,
            }
        });
        return Leads;
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
});

export type LeadRouter = typeof leadRouter;
