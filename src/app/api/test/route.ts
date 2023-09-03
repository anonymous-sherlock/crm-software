import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  try {
    console.log("Creating Store");
    const body = await req.formData();

    console.log(body);

    return NextResponse.json({ message: "Hello from Next.js!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "There is an error :", error: error });
  }
}
