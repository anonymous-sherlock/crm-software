import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const requestHeaders = new Headers(req.headers);
  const bearer = requestHeaders.get("authorization")
  console.log(requestHeaders)

  return NextResponse.json({ id: params.id, bearer });
}
