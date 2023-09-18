import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface ActivateTokenWhereInput {
  searchParamToken: string;
  // Other properties of ActivateTokenWhereInput
}
export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const searchParamToken = url.searchParams.get("verify");
  if (!searchParamToken) {
    return NextResponse.json(
      { error: "Token is invalid or expired" },
      { status: 498 }
    );
  }

  try {
    const user = await db.user.findFirst({
      where: {
        activateTokens: {
          some: {
            AND: [
              {
                activatedAt: null,
              },
              {
                createdAt: {
                  gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                },
              },
              {
                token: searchParamToken,
              },
            ],
          },
        },
      },
    });

    if (!user) {
      throw new Error("Token is invalid or expired");
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        active: true,
      },
    });

    await db.activateToken.update({
      where: {
        token: searchParamToken,
      },
      data: {
        activatedAt: new Date(),
      },
    });

    redirect("/login");
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
