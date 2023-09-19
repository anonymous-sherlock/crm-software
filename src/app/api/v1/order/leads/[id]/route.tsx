import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  return NextResponse.json({ id: params.id });
}
