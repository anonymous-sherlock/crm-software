import { serverClient } from "@/app/_trpc/serverClient";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Ghost } from "lucide-react";
import Link from "next/link";
import { columns } from "./data-table/components/columns";
import { DataTable } from "./data-table/components/data-table";

export default async function CampaignPage() {
  const campaignsData = await serverClient.campaign.getAll();

  return (
    <>
      <ScrollArea className="w-full rounded-md" type="always">
        <div className=" border-1 h-full flex-1 flex-col space-y-8 rounded-lg border-gray-200 bg-white p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your Campaign!
              </p>
            </div>
            <Link
              href="/campaign/create"
              className={buttonVariants({ size: "sm", variant: "outline" })}
            >
              Add Campaign
            </Link>
          </div>
          {campaignsData.length === 0 ? (
            <div className="!mb-20 !mt-20 flex flex-col items-center gap-2">
              <Ghost className="h-8 w-8 text-zinc-800" />
              <h3 className="text-xl font-semibold">
                Pretty empty around here
              </h3>
              <p>Let&apos;s create your first campaign.</p>
            </div>
          ) : (
            <DataTable  data={campaignsData} columns={columns} />
          )}
        </div>
        <ScrollBar orientation="horizontal" className="w-full" />
      </ScrollArea>
    </>
  );
}
