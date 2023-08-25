import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  try {
    const user = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });
    return NextResponse.json( user );
  } catch (error) {
    return NextResponse.json( {
      error: "not found any user",
    } );

  }
}
