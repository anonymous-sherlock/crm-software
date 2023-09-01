import { SubMenuTypes } from "@/types";
import { FaCircleUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdDashboard, MdLeaderboard } from "react-icons/md";
import { PiFilesDuotone } from "react-icons/pi";
import { RiBuilding3Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";

export const Menus = [
  { title: "Dashboard", icon: MdDashboard, url: "/dashboard" },
  { title: "Leads", icon: MdLeaderboard, url: "/leads" },
  { title: "Offers ", icon: PiFilesDuotone, url: "/offers", gap: true },
  { title: "Setting", icon: IoSettings, url: "/profile/settings" },
  {
    title: "Accounts",
    icon: FaCircleUser,
    url: "/profile",
    gap: true,
  },
];

export const subMenusList: SubMenuTypes[] = [
  {
    name: "Products",
    icon: RiBuilding3Line,
    menus: [
      {
        id: "1",
        label: "All Products",
        url: "/products",
      },
      {
        id: "2",
        label: "New Products",
        url: "/products-new",
      },
    ],
  },
  {
    name: "analytics",
    icon: TbReportAnalytics,
    menus: [
      {
        id: "1",
        label: "Campaign",
        url: "/campaign",
      },
      {
        id: "2",
        label: "New Campaign",
        url: "/campaign-new",
      },
    ],
  },
];
