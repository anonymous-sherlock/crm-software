import { EmailTemplate } from "@/components/emails/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
interface reqBodyProps {
  name: string
  email: string
  message: string

}
export async function POST(req: NextRequest) {
  const body:reqBodyProps = await req.json()
  try {
    const data = await resend.emails.send({
      from: "Adscrush <support@adscrush.com>",
      to: ["akashcontentegy@gmail.com"],
      subject: "🙌 Complete your sign up to Adscrush!",
      react: EmailTemplate({ name: "John" , verifyTokenUrl:"abc/asdfdf"}) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
