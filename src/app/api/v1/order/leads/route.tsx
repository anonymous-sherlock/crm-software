import { db } from "@/lib/db";
import { LeadValidator } from "@/schema/LeadSchema";
import IpInfoSchema from "@/schema/ipInfoSchema";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


export async function POST(
    req: NextRequest, res: NextResponse
) {
    try {
        const body = await req.json()
        const { campaignCode, userId, data: { name, phone, address } } = LeadValidator.parse(body)
        let bearerToken
        const campaign = await db.campaign.findUnique({
            where: {
                code: campaignCode
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
        const validApiKey = await db.apiKey.findFirst({
            where: {
                key: apiKey,
                enabled: true
            }
        })
        if (!validApiKey) {
            throw new Error("Invalid Api Key");
        }

        if (!authorizationHeader) {
            throw new Error("Authorization Header not provided in headers");
        }
        if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
            bearerToken = authorizationHeader.slice(7);
        }
        const userIp =
            requestHeaders.get("x-forwarded-for") || requestHeaders.get("x-real-ip");
        const ipInfoResponse = await axios.get(`https://ipapi.co/${"123.45.67.89"}/json`);
        const { country_name, region, city, ip, version, country_capital, country_calling_code, postal, } = IpInfoSchema.parse(ipInfoResponse.data)

        const user = await db.user.findFirst({
            where: {
                OR: [
                    {
                        id: userId
                    },
                    {
                        AND: [
                            {
                                campaigns: {
                                    some: {
                                        code: campaign.code
                                    }
                                }
                            },
                            {
                                apiKeys: {
                                    some: {
                                        key: apiKey,
                                        enabled: true,
                                    }
                                },
                            },
                            {
                                BearerToken: {
                                    some: {
                                        key: bearerToken,
                                        active: true
                                    },
                                }
                            }
                        ]
                    }
                ]
            }
        })


        if (!user) {
            throw new Error("user Not Found");
        }

        const newLead = await db.lead.create({
            data: {
                campaingId: campaign.id,
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
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error);
            return NextResponse.json({ error: error.flatten() }, { status: 402 });
        } else if (error instanceof Error) {
            console.error(error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error(error);
            return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
        }
    }
}