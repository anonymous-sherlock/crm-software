import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { Session } from "next-auth/";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const id = params.id;

  try {
    const session = await getAuthSession();
    const { user } = session as Session;
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    }
    const product = await db.product.findFirst({
      where: {
        productId: id,
        ownerId: user.id,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const deletedProduct = await db.product.delete({
      where: {
        productId: id,
      },
    });

    const { ownerId, productId, ...result } = deletedProduct;

    return NextResponse.json({
      success: true,
      message: "Product Deleted Successfully",
      product: result,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
