import { authOptions } from "@/lib/authOption";
import { db } from "@/lib/db";
import { productFormSchema } from "@/schema/productSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const body = await req.formData();

  
}
