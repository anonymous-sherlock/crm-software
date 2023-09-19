import { z } from "zod";

export const campaignFormSchema = z.object({
  campaignName: z
    .string({
      required_error: "Campaign name is required.",
    })
    .nonempty({
      message: "Campaign name is required.",
    })
    .min(2, {
      message: "Campaign name must be at least 2 characters.",
    }),
  campaignDescription: z.string().optional(),
  product: z.string({ required_error: "product is required to create a campaign" })
  .nonempty({
    message: "product is required to create a campaign.",
  })
});

export type CampaignFormPayload = z.infer<typeof campaignFormSchema>;
