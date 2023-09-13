import Leads from "@/components/dashboard/Leads";
import OverviewCard from "@/components/dashboard/OverviewCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adscrush | Dashboard",
  description: "",
};

export default function Home() {
  return (
    <div className="">
      <OverviewCard />
    </div>
  );
}
