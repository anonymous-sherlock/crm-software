import { db } from "@/lib/db";
import { getAllProductsForUser } from "@/lib/dbAction";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParam = req.nextUrl.searchParams;

  const productName = searchParam.get("name");
  console.log(productName);

  try {
    const products = await db.product.findMany({
      where: {
        name: {
          contains: productName as string,
        },
      },
      include: {
        images: true,
      },
    });
    if (!products) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const productsArray = Object.entries(products).map((e) => e[1]);
    return NextResponse.json({ data: productsArray }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
