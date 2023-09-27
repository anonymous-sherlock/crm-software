import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

import Notification from "@/components/Notification";
import { UserAccountNav } from "@/components/UserAccountNav";
import { getAuthSession } from "@/lib/authOption";
import Search from "./Search";
import ToggleSidebar from "./ToggleSidebar";
import WalletBalance from "@/components/wallet/WalletBalance";

export async function Header() {
  const session = await getAuthSession();

  return (
    <React.Fragment>
      <nav className="sticky z-99 lg:z-50 left-0 top-0  w-full justify-between border-gray-200 bg-white/95 backdrop-blur-sm before:shadow-[-2px_3px_90px_-20px_rgb(0_0_0_/_25%)] dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-2 md:p-4">
          <ToggleSidebar />
          <Search />

          <div className="flex flex-1 items-center justify-end space-x-4 md:order-2 ">
            <WalletBalance />
            <Notification />
            {/* <ThemeToggle /> */}

            {session?.user && <UserAccountNav user={session.user} />}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
