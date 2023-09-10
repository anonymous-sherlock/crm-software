import { SubMenuTypes } from "@/types";
import { BsPerson } from "react-icons/bs";
import { MdDashboard, MdLeaderboard } from "react-icons/md";
import { PiFilesDuotone } from "react-icons/pi";
import { RiBuilding3Line } from "react-icons/ri";
import { SlSettings } from "react-icons/sl";
import { TbReportAnalytics } from "react-icons/tb";

export const Menus = [
  { label: "Dashboard", icon: MdDashboard, url: "/dashboard" },
  { label: "Leads", icon: MdLeaderboard, url: "/leads" },
  { label: "Offers ", icon: PiFilesDuotone, url: "/offers", gap: true },
];
export const singleMenu = [
  {
    label: "Profile",
    icon: BsPerson,
    url: "/user/profile",
    gap: true,
  },
  {
    label: "Settings",
    icon: SlSettings,
    url: "/user/settings",
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
        url: "/products/create",
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
        url: "/campaign/create",
      },
    ],
  },
];
