import { db } from "@/lib/db";
import IpInfoSchema from "@/schema/ipInfoSchema";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LeadValidator = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string().optional()
})
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    const body = await req.json()
    const { name, phone, address } = LeadValidator.parse(body)
    const campaign = await db.campaign.findUnique({
      where: {
        campaignId: params.id
      }
    })
    if (!campaign) {
      throw new Error('Campaign not Found')
    }
    const requestHeaders = new Headers(req.headers);
    const authorizationHeader = requestHeaders.get("authorization");
    const apiKey = requestHeaders.get("API_Key")
    if (!apiKey) {
      throw new Error("API Key not provided in headers");
    }
    if (!authorizationHeader) {
      throw new Error("Authorization Header not provided in headers");
    }
    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      const bearerToken = authorizationHeader.slice(7); // Remove "Bearer " prefix

      const userIp =
        requestHeaders.get("x-forwarded-for") || requestHeaders.get("x-real-ip");
      const ipInfoResponse = await axios.get(`https://ipapi.co/${"123.45.67.89"}/json`);
      const { country_name, region, city, ip, version, country_capital, country_calling_code, postal, } = IpInfoSchema.parse(ipInfoResponse.data)

      const user = await db.user.findFirst({
        where: {
          campaigns: {
            some: {
              campaignId: campaign.campaignId
            }
          },
          apiKeys: {
            some: {
              key: apiKey,
              enabled: true,
            }
          },
          BearerToken: {
            some: {
              key: bearerToken,
              active: true
            },

          }

        }
      })
      if (!user) {
        throw new Error("user Not Found");
      }

      const newLead = await db.lead.create({
        data: {
          leadCampaingId: campaign.id,
          ip,
          country: country_name ?? "",
          name: name,
          phone: phone,
          address: address ?? city ?? "",
          region: region ?? "",
          state: region ?? "",
          userId: user.id,
          status: name.includes("test") ? "Trashed" : "Approved"
        }
      })


      return NextResponse.json({ sucess: true, lead: newLead });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
