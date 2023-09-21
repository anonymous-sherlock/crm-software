import { z } from "zod";
export enum TrafficSourceDefault {
  Social = "Social",
  Adult = "Adult",
  Native = "Native",
  Google = "Google",
  Facebook = "Facebook",
}

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
  leadsRequirements: z
    .string({
      required_error: "Daily Leads Requirements are Required",
    })
    .nonempty({
      message: "Daily Leads Requirements are Required.",
    }),
  campaignDescription: z.string().optional(),
  product: z
    .string({ required_error: "Product is required to create a campaign" })
    .nonempty({
      message: "Product is required to create a campaign.",
    }),

  // New fields for Daily leads requirement
  workingHours: z
    .number()
    .int()
    .min(0, { message: "Working hours must be a positive integer." }),
  workingDays: z
    .number()
    .int()
    .min(0, { message: "Working days must be a positive integer." }),
  callCenterTeamSize: z
    .number({
      required_error: "Call center team size is required",
    })
    .int()
    .min(0, { message: "Call center team size must be a positive integer." }),

  targetCountry: z.string().optional(),
  targetRegion: z.string().optional(),
  targetAge: z
    .object({
      min: z
        .number()
        .int()
        .min(0, { message: "Minimum age must be a positive integer." }),
      max: z
        .number()
        .int()
        .min(0, { message: "Maximum age must be a positive integer." }),
    })
    .optional(),
  targetGender: z.enum(["male", "female"]),
  trafficSource: z
    .nativeEnum(TrafficSourceDefault)
    .refine((value) => value !== undefined, {
      message: "Traffic source is required.",
      params: { required_error: "Traffic source is required." },
    }),
});

export type CampaignFormPayload = z.infer<typeof campaignFormSchema>;
