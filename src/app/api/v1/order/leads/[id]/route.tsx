import { db } from "@/lib/db";
import IpInfoSchema from "@/schema/ipInfoSchema";
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
    const ipInfoResponse = await axios.get(`https://ipapi.co/${"123.45.67.89"}/json`);
    const { country_name, region, city, ip, version, country_capital, country_calling_code, postal, } = IpInfoSchema.parse(ipInfoResponse.data)




    return NextResponse.json({ id: params.id, ip, country_name, country_capital, city, country_calling_code, bearer });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
