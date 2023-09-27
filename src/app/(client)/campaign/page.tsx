import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { DataTable } from "./data-table";
import { Campaign, columns } from "./columns";

async function getData(): Promise<Campaign[]> {
  const session = await getAuthSession();
  if (!session) {
    return [];
  }
  // Retrieve the 'products' array property from the result
  const campaignsData = await db.campaign.findMany({
    where: {},
  });

  const campaigns = campaignsData.map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
    status: "pending",
    leadsRequirements: campaign.leadsRequirements,
    targetCountry: campaign.targetCountry,
  }));

  return campaigns;
}

export default async function CampaignPage() {
  const data = await getData(); // Use the Product type here

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
