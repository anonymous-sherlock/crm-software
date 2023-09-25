import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const uploadImageToCdn = async (cdnFormData: FormData) => {
  try {
    const response = await axios.post(
      process.env.CDN_URL as string,
      cdnFormData,
      {
        headers: {
          API_KEY: process.env.CDN_API_Key as string, // Replace with your actual API key
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error uploading to CDN:", error);

    if (error instanceof AxiosError) {
      return error.response?.data;
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
};
