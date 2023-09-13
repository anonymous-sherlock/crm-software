import logo from "@/assets/logo.png";
import Image from "next/image";
import * as React from "react";

interface EmailTemplateProps {
  name: string;
  verifyTokenUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  verifyTokenUrl,
}) => (
  <div>
    <>
      <table
        role="presentation"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: 0,
          borderSpacing: 0,
          fontFamily: "Arial, Helvetica, sans-serif",
          backgroundColor: "rgb(239, 239, 239)",
        }}
      >
        <tbody>
          <tr>
            <td
              align="center"
              style={{
                padding: "1rem 2rem",
                verticalAlign: "top",
                width: "100%",
              }}
            >
              <table
                role="presentation"
                style={{
                  maxWidth: 600,
                  borderCollapse: "collapse",
                  border: 0,
                  borderSpacing: 0,
                  textAlign: "left",
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: "40px 0px 0px" }}>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ paddingBottom: 20 }}>
                          <Image
                            src={logo.src}
                            alt="Company"
                            width={56}
                            height={56}
                            style={{ width: 56 }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          padding: 20,
                          backgroundColor: "rgb(255, 255, 255)",
                        }}
                      >
                        <div
                          style={{ color: "rgb(0, 0, 0)", textAlign: "left" }}
                        >
                          <h1 style={{ margin: "1rem 0", fontSize: "22px", fontWeight: "600" }}>
                            Hi, {name}...
                          </h1>
                          <h1 style={{ margin: "1rem 0" }}>Final step...</h1>
                          <p style={{ paddingBottom: 16 }}>
                            Follow this link to verify your email address.
                          </p>
                          <p style={{ paddingBottom: 16 }}>
                            <a
                              href={verifyTokenUrl}
                              target="_blank"
                              style={{
                                padding: "12px 24px",
                                borderRadius: 4,
                                color: "#FFF",
                                background: "#2B52F5",
                                display: "inline-block",
                                margin: "0.5rem 0",
                              }}
                            >
                              Verify Your Email
                            </a>
                          </p>
                          <p style={{ paddingBottom: 16 }}>
                            If you didn&apos;t ask to verify this address, you
                            can ignore this email.
                          </p>
                          <p style={{ paddingBottom: 16 }}>
                            Thanks,
                            <br />
                            The Adscrush team
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          paddingTop: 20,
                          color: "rgb(153, 153, 153)",
                          textAlign: "center",
                        }}
                      >
                        <p style={{ paddingBottom: 16 }}>
                          Made with <span className="text-red-500">♥</span>{" "}
                          Adscrush Team
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  </div>
);

export default EmailTemplate;
