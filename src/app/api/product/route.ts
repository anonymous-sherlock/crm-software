import { getAuthSession } from "@/lib/authOption";
import { getAllProductsForUser } from "@/lib/dbAction";
import { Session } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getAuthSession();
    const { user } = session as Session;
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    }

    const products = await getAllProductsForUser(user.id);
    if (!products) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ ...products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
