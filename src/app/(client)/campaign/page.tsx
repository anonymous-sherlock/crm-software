import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Campaign, columns } from "./data-table/components/columns";
import { DataTable } from "./data-table/components/data-table";
import { serverClient } from "@/app/_trpc/serverClient";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Ghost } from "lucide-react";

async function getData(): Promise<Campaign[]> {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const campaigns = await serverClient.getCampaigns();

  return campaigns as Campaign[];
}

export default async function CampaignPage() {
  const campaignsData = await getData();

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
            <Link
              href="/campaign/create"
              className={buttonVariants({ size: "sm", variant: "outline" })}
            >
              Add Campaign
            </Link>
          </div>
          {campaignsData.length === 0 ? (
            <div className="!mt-20 !mb-20 flex flex-col items-center gap-2">
              <Ghost className="h-8 w-8 text-zinc-800" />
              <h3 className="font-semibold text-xl">
                Pretty empty around here
              </h3>
              <p>Let&apos;s create your first campaign.</p>
            </div>
          ) : (
            <DataTable data={campaignsData} columns={columns} />
          )}
        </div>
        <ScrollBar orientation="horizontal" className="w-full" />
      </ScrollArea>
    </>
  );
}
