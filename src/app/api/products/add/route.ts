import { db } from "@/lib/db";
import { disconnectFTP, uploadImageFile } from "@/lib/ftp";
import { parsePrice } from "@/lib/helpers";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

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

    for (const image of productImages) {
      const filename = `${image.name}`;
      const imageBuffer = await image.arrayBuffer();
      const bufferStream = new Readable();
      bufferStream.push(Buffer.from(imageBuffer));
      bufferStream.push(null);
      const { imagePath, success } = await uploadImageFile(
        bufferStream,
        filename,
        `${token.id}/products/${productName}`
      );
      console.log("path :", imagePath);
      if (success) uploadedImages.push(imagePath as string);
    }
    // When done with FTP operations, call disconnect() to close the connection
    disconnectFTP();
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
        images: {
          createMany: {
            data: uploadedImages.map((url) => ({
              url: url,
            })),
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
