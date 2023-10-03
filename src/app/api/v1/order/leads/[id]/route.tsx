import { db } from "@/lib/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    const requestHeaders = new Headers(req.headers);
    const bearer = requestHeaders.get("authorization");
    const userIp =
      requestHeaders.get("x-forwarded-for") || requestHeaders.get("x-real-ip");
    const ipInfoResponse = await axios.get(`https://ipinfo.io/${userIp}/json`);
    const ipInfoData = ipInfoResponse.data
    console.log(ipInfoData)


    // const campaign = await db.campaign.findUnique({
    //   where: {
    //     campaignId: params.id,
    //   },
    // });
    // if(campaign){
    //   const newLead = db.leads.create({
    //     data:{
    //       name:
    //     }
    //   })
    // }
    return NextResponse.json({ id: params.id, userIp, bearer });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
