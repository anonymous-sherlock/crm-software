import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

import Notification from "@/components/Notification";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import Search from "./Search";
import ToggleSidebar from "./ToggleSidebar";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <React.Fragment>
      <nav className="sticky left-0 top-0  w-full justify-between border-gray-200 bg-white/95 backdrop-blur-sm before:shadow-[-2px_3px_90px_-20px_rgb(0_0_0_/_25%)] dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-2 md:p-4">
          <ToggleSidebar />
          <Search />

          <div className="flex flex-1 items-center justify-end space-x-4 md:order-2 ">
            <Notification />
            <ThemeToggle />

            {session && <UserProfileDropdown />}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
