import EmailTemplate from "@/components/emails/email-template";
import { ReactElement } from "react";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
interface senActivationEmailProps {
  name: string;
  email: string;
  verifyTokenUrl: string;
}
export async function senActivationEmail({
  name,
  email,
  verifyTokenUrl,
}: senActivationEmailProps) {
  try {
    const data = await resend.emails.send({
      from: "Adscrush <support@adscrush.com>",
      to: email,
      subject: "🙌 Complete your sign up to Adscrush!",
      react: EmailTemplate({
        name: name,
        verifyTokenUrl: verifyTokenUrl,
      }) as ReactElement,
    });

    return data;
  } catch (error) {
    return error;
  }
}
