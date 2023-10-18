import { serverClient } from "@/app/_trpc/serverClient";
import LeadsForm from "@/components/leads/LeadsForm";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { Ghost } from "lucide-react";
import { notFound } from "next/navigation";
import { columns } from "./data-table/components/columns";
import { DataTable } from "./data-table/components/data-table";

export default async function LeadsPage({
  params
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined }

}) {
  const campaign = await db.campaign.findFirst({
    where: {
      code: params.id
    },
    select: {
      name: true,
      id: true,
      code: true,
    }
  })
  if (!campaign) {
    notFound()
  }

  const LeadsData = await serverClient.lead.getCampaignLeads({ campaignId: campaign.id });


  return (
    <ScrollArea className="w-full rounded-md" type="always">
      <div className="border-1 h-full flex-1 flex-col space-y-8 rounded-lg border-gray-200 bg-white p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your leads!
            </p>
            <p className="mt-2 font-medium text-[15px] text-gray-800">
              Campaign Name :{" "}<span className="text-gray-500">{campaign?.name}</span>
            </p>
          </div>

          <LeadsForm campaignCode={campaign.code} />
        </div>
        {LeadsData.length === 0 ? (
          <div className="!mb-20 !mt-20 flex flex-col items-center gap-2">
            <Ghost className="h-8 w-8 text-zinc-800" />
            <h3 className="text-xl font-semibold">
              Pretty empty around here
            </h3>
            <p>Let&apos;s Add your first Lead.</p>
          </div>
        ) : (

          <DataTable data={LeadsData} columns={columns} campaignId={campaign.id} />
        )}
      </div>
      <ScrollBar orientation="horizontal" className="w-full" />
    </ScrollArea>
  )
}
