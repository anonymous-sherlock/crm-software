import { CampaignStatus } from "@prisma/client";
import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  campaignId: z.string(),
  campaignName: z.string(),
  status: z.nativeEnum(CampaignStatus),
  targetCountry: z.string(),
});

export type Task = z.infer<typeof taskSchema>;