import { serverClient } from "@/app/_trpc/serverClient";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Ghost, MessageSquare, Plus } from "lucide-react";
import moment from "moment";
import Link from "next/link";

const page = async () => {
  const data = await serverClient.getCampaignForLeads();

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
                Here&apos;s a list of your Campaign click on it to view the leads!
              </p>
            </div>
            <Link
              href="/campaign/create"
              className={buttonVariants({ size: "sm", variant: "outline" })}
            >
              Add Campaign
            </Link>
          </div>
          {data.length === 0 ? (
            <div className="!mb-20 !mt-20 flex flex-col items-center gap-2">
              <Ghost className="h-8 w-8 text-zinc-800" />
              <h3 className="text-xl font-semibold">
                Pretty empty around here
              </h3>
              <p>Let&apos;s create your first campaign.</p>
            </div>
          ) : (
            data && data?.length !== 0 ? (
              <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
                {data
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((campaign) => (
                    <li
                      key={campaign.campaignId}
                      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
                    >
                      <Link
                        href={`/leads/${campaign.campaignId}`}
                        className="flex flex-col gap-2"
                      >
                        <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="truncate text-lg font-medium text-zinc-900">
                                {campaign.name}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="px-6 mt-4 grid grid-cols-2 place-items-center py-2 gap-2 text-xs text-zinc-500">
                        <div className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          {moment(campaign.createdAt)
                            .format("MMM, DD, YYYY")
                            .toString()}
                        </div>

                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          New Leads
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : null
          )}
        </div>
        <ScrollBar orientation="horizontal" className="w-full" />
      </ScrollArea>

    </>
  );
};

export default page;
