import { db } from "@/lib/db";
import { campaignFormSchema } from "@/schema/campaignSchema";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  try {
    const {
      campaignName,
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
      workingHours,
    } = campaignFormSchema.parse(body);

    const newCampaign = await db.campaign.create({
      data: {
        name: campaignName,
        callCenterTeamSize,
        leadsRequirements,
        targetCountry,
        targetGender: targetGender === "female" ? "Female" : "Male",
        trafficSource: trafficSource,
        workingDays,
        workingHours,
        description: campaignDescription,
        targetRegion: "",
        campaignId: randomUUID(),
        product: {
          connect: {
            productId: product,
          },
        },
      },
    });

    console.log(newCampaign);
    return NextResponse.json(
      { success: true, ...newCampaign },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not create campaign at this time. Please try later",
      { status: 500 }
    );
  }
}
function uuid(): any {
  throw new Error("Function not implemented.");
}

