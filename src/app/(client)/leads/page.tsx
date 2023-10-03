import { serverClient } from "@/app/_trpc/serverClient";
import { Button } from "@/components/ui/button";
import { Ghost, MessageSquare, Plus } from "lucide-react";
import moment from "moment";
import Link from "next/link";

const page = async () => {
  const data = await serverClient.getCampaignForLeads();

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-3xl text-gray-900">
          Select a Capaign to get Leads
        </h1>

        <Button>Create a Camapign</Button>
      </div>

      {/* display all user files */}
      {data && data?.length !== 0 ? (
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
      ) : null}
    </main>
  );
};

export default page;
