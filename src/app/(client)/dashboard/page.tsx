import BarChartBox from "@/components/charts/BarChartBox";
import BigChartBox from "@/components/charts/BigChartBox";
import ChartBox from "@/components/charts/ChartBox";
import PieChartBox from "@/components/charts/PieChartBox";
import TopBox from "@/components/charts/TopBox";
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from "@/components/charts/data/data";
import OverviewCard from "@/components/dashboard/OverviewCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from "next";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

export const metadata: Metadata = {
  title: "Adscrush | Dashboard",
  description: "",
};

export default async function Home() {
  return (
    <>
      <Suspense fallback={<p>Loading feed...</p>}>
        <div className="">

          <OverviewCard />
        </div>
        <ScrollArea className="w-full mb-10 ">
          <div className="grid gap-5 grid-cols-4 grid-flow-dense auto-rows-[minmax(180px,auto)]">
            <div className="box col-span-1 row-span-3">
              <TopBox />
            </div>
            <div className="box box2">
              <ChartBox {...chartBoxUser} />
            </div>

            <div className="box box3">
              <ChartBox {...chartBoxProduct} />
            </div>
            <div className="box col-span-1 row-span-3">
              <PieChartBox />
            </div>
            <div className="box box5">
              <ChartBox {...chartBoxConversion} />
            </div>
            <div className="box box6">
              <ChartBox {...chartBoxRevenue} />
            </div>
            <div className="box box7 col-span-2 row-span-2">
              <BigChartBox />
            </div>
            <div className="box box8">
              <BarChartBox {...barChartBoxVisit} />
            </div>
            <div className="box box9">
              <BarChartBox {...barChartBoxRevenue} />
            </div>
          </div>
        </ScrollArea>
      </Suspense>

    </>
  );
}
