import {
  Button,
  Container,
  Heading,
  Hr,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
  Body,
  Head,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  name: string;
  verifyTokenUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  verifyTokenUrl,
}) => (
  <Html className="">
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    </Head>
    <Body className="text-black">
      <Tailwind>
        <Section
          role="presentation"
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            backgroundColor: "rgb(239, 239, 239)",
          }}
          className="w-full border-none border-collapse border-spacing-0 m-auto"
        >
          <Container role="presentation" className="max-w-[550px] ">
            <Container className="rounded-lg shadow-lg bg-white p-5 px-10 w-full mt-20 mx-auto">
              <div className="text-black text-left p-6">
                <Img
                  src="https://adscrush.com/wp-content/uploads/2023/08/favicon.png"
                  className="w-16 my-6"
                />
                <Heading
                  as="h1"
                  className="my-3 text-xl font-semibold capitalize text-black"
                >
                  Hi, {name}...
                </Heading>
                <Heading as="h2" className="my-2 text-black text-base">
                  Final step...
                </Heading>
                <Text>Follow this link to verify your email address.</Text>
                <Text>
                  <Button
                    href={verifyTokenUrl}
                    target="_blank"
                    className="bg-[#2B52F5] text-white inline-block my-2 hover:bg-blue-900 px-6 py-3 selection:rounded-sm"
                  >
                    Verify Your Email
                  </Button>
                </Text>
                <Hr className="my-4" />
                <Text style={{ paddingBottom: 16 }}>
                  If you didn&apos;t ask to verify this address, you can ignore
                  this email.
                </Text>
                <Text style={{ paddingBottom: 16 }}>
                  Thanks,
                  <br />
                  The Adscrush team
                </Text>
              </div>
            </Container>
            <Container className="text-center py-5 text-[#999999]">
              <p className="pb-4">
                Made with <span className="text-red-500">♥</span> Adscrush Team
              </p>
            </Container>
          </Container>
        </Section>
      </Tailwind>
    </Body>
  </Html>
);

export default EmailTemplate;
