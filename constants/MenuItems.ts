import { MdDashboard } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { HiSearch } from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
import { PiFilesDuotone } from "react-icons/pi";

export const Menus = [
  { title: "Search", icon: HiSearch, url: "?search=" },
  { title: "Dashboard", icon: MdDashboard, url: "/dashboard" },
  { title: "Leads", icon: MdLeaderboard, url: "/leads" },
  { title: "Offers ", icon: PiFilesDuotone, url: "/offers", gap: true },
  { title: "Offers ", icon: PiFilesDuotone, url: "/offers", gap: true },
  { title: "Offers ", icon: PiFilesDuotone, url: "/offers", gap: true },
  { title: "Offers ", icon: PiFilesDuotone, url: "/offers", gap: true },
  { title: "Setting", icon: IoSettings, url: "/profile/settings" },
  { title: "Offers ", icon: PiFilesDuotone, url: "/offers", gap: true },
  { title: "Setting", icon: IoSettings, url: "/profile/settings" },
  { title: "Offers ", icon: PiFilesDuotone, url: "/offers", gap: true },
  { title: "Setting", icon: IoSettings, url: "/profile/settings" },
  { title: "Setting", icon: IoSettings, url: "/profile/settings" },
  { title: "Setting", icon: IoSettings, url: "/profile/settings" },
  { title: "Offers ", icon: PiFilesDuotone, url: "/offers", gap: true },
  { title: "Setting", icon: IoSettings, url: "/profile/settings" },
  { title: "Setting", icon: IoSettings, url: "/profile/settings" },
  { title: "Accounts", icon: FaCircleUser, url: "/profile", gap: true , last:true },
];
