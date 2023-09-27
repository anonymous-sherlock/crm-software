import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { parsePrice } from "@/lib/helpers";
import { uploadImageToCdn } from "@/lib/helpers/ImageUpload";
import { productFormSchema } from "@/schema/productSchema";
import { ImageUploadError, ImageUploadSuccess } from "@/types/api";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getAuthSession();
    const { user } = session as Session;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const schemaWithExluded = productFormSchema.omit({
      productImages: true,
    });
    const parsedFormData: { [key: string]: any } = {};

    // Iterate over form fields and populate the parsedFormData object
    for (const [key, value] of formData.entries()) {
      // Exclude the "productImages" property
      if (key !== "productImages") {
        parsedFormData[key] = value;
        if (key === "mediaUrls") {
          parsedFormData[key] = JSON.parse(value.toString());
        }
      }
    }

    const {
      productName,
      productPrice,
      productCategory,
      productQuantity,
      productDescription,
      mediaUrls,
    } = schemaWithExluded.parse(parsedFormData);

    const productImages = formData.getAll("productImages");

    const uploadedImages: string[] = [];

    const remotePath = `/products/${productName}`; // Create the remotePath
    const cdnFormData = new FormData();
    cdnFormData.append("remotePath", remotePath);
    for (let i = 0; i < productImages.length; i++) {
      // Append each selected image file to the cdnFormData
      const image = productImages[i] as unknown as File;
      cdnFormData.append("productImages[]", image, image.name); // Append image with name
    }

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
        category: productCategory,
        owner: {
          connect: {
            id: user.id,
          },
        },
        media: {
          createMany: {
            data: (mediaUrls || []).map((url) => ({
              url: url.value,
            })),
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
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return NextResponse.json(
      { error: "Could not create product at this time. Please try later" },
      { status: 500 }
    );
  }
}
