import { workingDayOptions } from "@/constants/time";
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
  // Leads Requirement
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
  // working Hours
  workingHours: z.object({
    startTime: z.string().nonempty({
      message: "Start time is required.",
    }),
    endTime: z.string().nonempty({
      message: "End time is required.",
    }),
  }),

  workingDays: z
    .object({
      start: z
        .string({
          required_error: "Start day is required",
        })
        .nonempty({
          message: "Start day is required.",
        }),
      end: z
        .string({
          required_error: "End day is required",
        })
        .nonempty({
          message: "End day is required.",
        }),
    })
    .refine(
      (value) => {
        // Check if 'value.start' and 'value.end' are both valid days
        return (
          workingDayOptions.includes(value.start) &&
          workingDayOptions.includes(value.end)
        );
      },
      {
        message: "Invalid working days selected.",
      }
    ),

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
  // target region
  targetRegion: z
    .string({
      required_error: "Target region is required",
    })
    .array()
    .nonempty({
      message: "Target region is required.",
    }),

  // Target Age
  targetAge: z.object({
    min: z
      .string({
        required_error: "Minimum age is required",
      })
      .refine(
        (value) => {
          const parsedValue = parseInt(value, 10);
          return !isNaN(parsedValue) && parsedValue >= 18 && parsedValue <= 65;
        },
        { message: "Minimum age must be between 18 and 65." }
      ),
    max: z
      .string({
        required_error: "Maximum age is required",
      })
      .refine(
        (value) => {
          const parsedValue = parseInt(value, 10);
          return !isNaN(parsedValue) && parsedValue >= 18 && parsedValue <= 65;
        },
        { message: "Maximum age must be between 18 and 65." }
      ),
  }),
  targetGender: z.enum(["male", "female"]),
  trafficSource: z.nativeEnum(TrafficSourceDefault),
});

export type CampaignFormPayload = z.infer<typeof campaignFormSchema>;
