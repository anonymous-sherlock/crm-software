import { uploadImageToCdn } from "@/lib/helpers/ImageUpload";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const productName = String(formData.get("productName") || "");
  const productImages = formData.getAll("productImages");

  console.log(formData);
  const remotePath = `/products/${productName}`; // Create the remotePath
  const cdnFormData = new FormData();
  cdnFormData.append("remotePath", remotePath);
  for (let i = 0; i < productImages.length; i++) {
    // Append each selected image file to the cdnFormData
    const image = productImages[i] as unknown as File;
    cdnFormData.append("productImages", image, image.name); // Append image with name
  }

  console.log(cdnFormData)
  try {
    const response = await axios.post(
      process.env.CDN_URL as string,
      cdnFormData as FormData,
      {
        headers: {
          API_KEY: "fQR3bWOuLMpyvjv9DblDW06gxgdeBL8nSvT1bhSKxFQBvFqA/CkCFA==", // Replace with your actual API key // Include the headers from FormData
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data);
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Something Went Wrong, Please try again",
        },
        {
          status: 500,
        }
      );
    }
  }
}
