import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { z } from "zod";
import { Campaign, columns } from "./data-table/components/columns";
import { DataTable } from "./data-table/components/data-table";
import { taskSchema } from "./data-table/data/schema";
import tasklist from "./data-table/data/tasks.json";
import { redirect } from "next/navigation";

async function getData(): Promise<Campaign[]> {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  // Retrieve the 'products' array property from the result
  const campaignsData = await db.campaign.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      campaignId: true,
      description: true,
      name: true,
      status: true,
      leadsRequirements: true,
      targetCountry: true,
      product: {
        select: {
          productId: true,
          name: true,
          category: true,
          description: true,
          price: true,
          images: true,
        },
      },
    },
  });
  console.log();

  const campaigns = campaignsData.map((campaign) => ({
    campaignId: campaign.campaignId,
    name: campaign.name,
    description: campaign.description,
    status: campaign.status,
    leadsRequirements: campaign.leadsRequirements,
    targetCountry: campaign.targetCountry,
    product: {
      productId: campaign.product?.productId ?? "",
      name: campaign.product?.name ?? "", // Add the nullish coalescing operator here
      category: campaign.product?.category,
      description: campaign.product?.description ?? "",
      price: campaign.product?.price,
      images: campaign.product?.images ?? [],
    },
  }));

  return campaigns as Campaign[];
}
async function getTasks() {
  const data = tasklist;

  return z.array(taskSchema).parse(data);
}

export default async function CampaignPage() {
  const campaignData = await getData(); // Use the Product type here

  return (
    <>
      <ScrollArea className="w-full rounded-md" type="always">
        <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex bg-white rounded-lg border-1 border-gray-200">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your Campaign!
              </p>
            </div>
          </div>
          <DataTable data={campaignData} columns={columns} />
        </div>
        <ScrollBar orientation="horizontal" className="w-full" />
      </ScrollArea>
    </>
  );
}
