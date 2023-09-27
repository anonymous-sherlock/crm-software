import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
function generateAlias() {
  // Generate a UUID and use the first 8 characters as the alias
  const uuid = randomUUID();
  const alias = uuid.substring(0, 8);
  return alias;
}
export async function GET() {
  const campaignAlias = generateAlias();

  const uuid = randomUUID().toString().substring(0, 5);

  return NextResponse.json({ uuid: uuid, campaignAlias }, { status: 200 });
}
