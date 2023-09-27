import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { Campaign } from "@prisma/client";

async function getData() {
  const session = await getAuthSession();
  if (!session) {
    return [];
  }
  // Retrieve the 'products' array property from the result
  const campaignsData = await db.campaign.findMany({
    where: {},
  });
  interface CampaignProps {
    campaignsData: Pick<
      Campaign,
      "campaignId" | "name" | "targetCountry" | "leadsRequirements"
    >;
  }
  const campaigns = campaignsData;
  return campaigns || []; // Return an empty array if products is null
}

export default async function CampaignPage() {
  const data = await getData(); // Use the Product type here

  return <div>{JSON.stringify(data)}</div>;
}
