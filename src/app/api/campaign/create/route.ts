import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { campaignFormSchema } from "@/schema/campaignSchema";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Session } from "next-auth";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  try {
    const session = await getAuthSession();
    const { user } = session as Session;
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
    const campaignID = generateCampaignID();

    console.log(targetRegion.toString());

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
            id: user.id,
          },
        },
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
      { status: 201 }
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
function generateCampaignID() {
  // Generate a UUID and use the first 8 characters as the alias
  const uuid = randomUUID();
  const alias = uuid.substring(0, 8);
  return alias;
}
