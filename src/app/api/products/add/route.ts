import { db } from "@/lib/db";
import { parsePrice } from "@/lib/helpers";
import { uploadImage } from "@/lib/helpers/fileUpload";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const productName = String(formData.get("productName") || "");
    const productPrice = String(formData.get("productPrice") || "");
    const productDescription = String(formData.get("productDescription") || "");
    const productQuantity = formData.get("productQuantity");
    const productCategory = String(formData.get("productCategory") || "");
    const productImages = formData.getAll("productImages") as File[];

    const uploadedImages: string[] = [];

    console.log(formData);

    for (const image of productImages) {
      const imgPath = await uploadImage(image, "user");
      console.log(imgPath);
      uploadedImages.push(imgPath as string);
    }

    const price = parsePrice(productPrice);
    const newProduct = await db.product.create({
      data: {
        name: productName,
        description: productDescription,
        price,
        quantity: Number(productQuantity),
        owner: {
          connect: {
            id: token.id,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `${productName ? productName + " " : ""}created successfully`,
        productImages: uploadedImages,
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
