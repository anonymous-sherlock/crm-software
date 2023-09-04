import React from "react";
import { Header } from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import UserAvatarDetails from "./sidebar/UserAvatarDetails";

type Props = {
  children: React.ReactNode;
};

export const SidebarLayout = ({ children }: Props) => {
  return (
    <div className="flex bg-secondary dark:bg-primary">
      <Sidebar>
        <UserAvatarDetails />
      </Sidebar>
      <main className="relative mx-auto w-full flex-1">
        <Header />
        <main className="mt-0 p-4">{children}</main>
      </main>
    </div>
  );
};
