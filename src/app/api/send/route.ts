import { EmailTemplate } from "@/components/emails/email-template";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ReactElement } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
interface reqBodyProps {
  userid: string;
  name: string;
  email: string;
}
export async function POST(req: NextRequest) {
  const { userid, name, email }: reqBodyProps = await req.json();
  try {
    const acivationtoken = db.activateToken.findFirst({
      where: {
        userId: userid,
      },
    });

    // const data = await resend.emails.send({
    //   from: "Adscrush <support@adscrush.com>",
    //   to: "layalakash4@gmail.com",
    //   subject: "🙌 Complete your sign up to Adscrush!",
    //   react : EmailTemplate({name:name,verifyTokenUrl:"/bhcakdfsdf"}) as ReactElement,
    // });

    return NextResponse.json(acivationtoken);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
