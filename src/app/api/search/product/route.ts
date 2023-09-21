import { db } from "@/lib/db";
import { getAllProductsForUser } from "@/lib/dbAction";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParam = req.nextUrl.searchParams;

  const productName = searchParam.get("name");
  const selectedId = searchParam.get("selectedId");
  console.log(selectedId, productName);

  try {
    let selectedProduct;
    if (selectedId) {
      selectedProduct = await db.product.findUnique({
        where: { productId: selectedId },
        include: { images: true },
      });
    }

    const products = await db.product.findMany({
      where: {
        name: { contains: productName as string },
        NOT: {
          productId: selectedProduct?.productId,
        },
      },

      include: {
        images: true,
      },
      take: 4,
    });

    if (!products) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let productsArray = Object.entries(products).map((e) => e[1]);

    if (selectedProduct) {
      productsArray = [selectedProduct, ...productsArray].slice(0, 4);
    }

    console.log(productsArray);
    return NextResponse.json({ data: productsArray }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong", brief: error },
      { status: 500 }
    );
  }
}
