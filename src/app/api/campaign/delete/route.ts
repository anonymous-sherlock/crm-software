import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { campaignFormSchema } from "@/schema/campaignSchema";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Session } from "next-auth";

const campaignIdSchema = z.object({
  campaignIds: z
    .string({
      required_error: "Campaign Id is required to delete a campaign",
    })
    .array()
    .nonempty({
      message: "Campaign Id is required.",
    }),
});
export async function DELETE(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body)
  const { campaignIds } = campaignIdSchema.parse(body);

  try {
    const session = await getAuthSession();
    const { user } = session as Session;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedCampaign = await db.campaign.deleteMany({
      where: {
        campaignId: {
          in: campaignIds,
        },
      },
    });
    const deletedCount = deletedCampaign.count;
    console.log(deletedCount)
    return NextResponse.json({ success: true, deletedCount }, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not delete campaign at this time. Please try later",
      { status: 500 }
    );
  }
}
