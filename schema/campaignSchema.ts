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
  campaignDescription: z.string().optional(),

  leadsRequirements: z
    .string({
      required_error: "Daily leads requirements are required",
    })
    .nonempty({
      message: "Daily leads requirements are required.",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "Daily leads requirements must be a valid number.",
    }),

  product: z
    .string({ required_error: "Product is required to create a campaign" })
    .nonempty({
      message: "Product is required to create a campaign.",
    }),

  // New fields for Daily leads requirement
  workingHours: z.object({
    startTime: z.string().nonempty({
      message: "Start time is required.",
    }),
    endTime: z.string().nonempty({
      message: "End time is required.",
    }),
  }),
  workingDays: z
    .number()
    .int()
    .min(0, { message: "Working days must be a positive integer." })
    .optional(),

  // Call Center Team size
  callCenterTeamSize: z
    .string({
      required_error: "Call center team size is required",
    })
    .refine((value) => value !== "0", {
      message: "Call center team size cannot be empty or 0.",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "Call center team size must be a valid number.",
    }),

  // Country Region
  targetCountry: z
    .string({
      required_error: "Target country is Required",
    })
    .nonempty({
      message: "Target country is Required.",
    }),
  targetRegion: z
    .string({
      required_error: "Target region is required",
    })
    .array()
    .nonempty({
      message: "Target region is required.",
    }),

  // Target Age
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
  trafficSource: z.nativeEnum(TrafficSourceDefault),
});

export type CampaignFormPayload = z.infer<typeof campaignFormSchema>;
