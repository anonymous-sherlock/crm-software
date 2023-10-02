"use client";
import { trpc } from "@/app/_trpc/client";
import { Icons } from "@/assets/Icons";
import { FC } from "react";

interface OverviewCardProps {}

const OverviewCard: FC<OverviewCardProps> = ({}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
      <div className="widget-item bg-white p-6 flex justify-between rounded-md">
        <div>
          <h4 className="text-lg font-semibold text-slate-700 mb-2 leading-none">
            356
          </h4>
          <p className="text-sm leading-4 space-y-2">Leads Received</p>
          <div className="badge flex items-center justify-center max-w-[70px] text-xs p-1 my-2 rounded-md text-green-900  bg-opacity-50 bg-green-200  space-x-1">
            {" "}
            <span>10%</span>
            <Icons.Leads />
          </div>
        </div>
        <div>
          <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-green-500">
            <Icons.GrowthChart />
          </span>
        </div>
      </div>
      <div className="widget-item bg-white p-6 flex justify-between rounded-md">
        <div>
          <h4 className="text-lg font-semibold text-slate-700 mb-2 leading-none">
            $5680
          </h4>
          <p className="text-sm leading-4">Average Daily Sales</p>
          <div className="badge flex items-center justify-center max-w-[70px] text-xs p-1 my-2 rounded-md text-purple-900  bg-opacity-50 bg-purple-200  space-x-1">
            <span>30%</span>
            <Icons.Sales />
          </div>
        </div>
        <div>
          <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-purple-500">
            <Icons.GrowthChart />
          </span>
        </div>
      </div>
      <div className="widget-item bg-white p-6 flex justify-between rounded-md">
        <div>
          <h4 className="text-lg font-semibold text-slate-700 mb-2 leading-none">
            5.8K
          </h4>
          <p className="text-sm leading-4">New Customers This Month</p>
          <div className="badge flex items-center justify-center max-w-[70px] text-xs p-1 my-2 rounded-md text-blue-900  bg-opacity-50 bg-blue-200  space-x-1">
            <span>13%</span>
            <Icons.Customers />
          </div>
        </div>
        <div>
          <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-purple-500">
            <Icons.GrowthChart />
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
