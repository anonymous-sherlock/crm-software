import { db } from "@/lib/db";
import { parsePrice } from "@/lib/helpers";
import { uploadImageToCdn } from "@/lib/helpers/ImageUpload";
import { ImageUploadError, ImageUploadSuccess } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const token = await getToken({ req });
    // if (!token) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const formData = await req.formData();
    const productName = String(formData.get("productName") || "");
    const productPrice = String(formData.get("productPrice") || "");
    const productDescription = String(formData.get("productDescription") || "");
    const productQuantity = formData.get("productQuantity");
    const productCategory = String(formData.get("productCategory") || "");
    const productImages = formData.getAll("productImages");
    const uploadedImages: string[] = [];

    console.log(productImages)
    const remotePath = `/products/${productName}`; // Create the remotePath
    const cdnFormData = new FormData();
    cdnFormData.append("remotePath", remotePath);
    for (let i = 0; i < productImages.length; i++) {
      // Append each selected image file to the cdnFormData
      const image = productImages[i] as unknown as File;
      cdnFormData.append("productImages[]", image, image.name); // Append image with name
    }

    console.log(cdnFormData)

    const cdnData = await uploadImageToCdn(cdnFormData);
    if (cdnData.success) {
      const successData = cdnData as ImageUploadSuccess;
      uploadedImages.push(...successData.data.imageUrls);
    } else {
      // This is an error response
      const errorData = cdnData as ImageUploadError;
      return NextResponse.json({ error: errorData.error }, { status: 500 });
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
            id: "clmonrize0000xbq04e5u388s",
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
