import { db } from "@/lib/db";
import { uploadImage } from "@/lib/helpers/fileUpload";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.formData();
  const token = await getToken({ req });
  const productName = body.get("productName");
  const productPrice = body.get("productPrice");
  const productDescription = body.get("productDescription");
  const productCategory = body.get("productCategory");
  const productImages = body.getAll("productImages") as File[];

  const uploadedImages = [];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  for (const image of productImages) {
    // upload image
    const imgPath = await uploadImage(image, "user");
    console.log(imgPath);
    uploadedImages.push(imgPath);
  }
  const newProduct = await db.product.create({
    data: {
      name: productName as string,
      description: productDescription as string,
      price: Number(productPrice),
      owner: {
        connect: {
          id: token.id,
        },
      },
    },
  });
  // const usersProduct = db.user.findUnique({
  //   select: {
  //     id: token.id as string,
  //     where: {},
  //   },
  // });
  if (body) {
    return NextResponse.json(
      {
        success: true,
        message: `${
          productName !== null || undefined || "" ? productName + " " : ""
        }created successfully`,
        productImages: uploadedImages,
        product: newProduct,
      },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
