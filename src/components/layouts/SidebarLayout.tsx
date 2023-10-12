import React, { PropsWithChildren } from "react";
import { Header } from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import UserAvatarDetails from "./sidebar/UserAvatarDetails";
import { ScrollArea } from "../ui/scroll-area";

export const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full bg-[#F4F5F7] dark:bg-primary">
      <Sidebar>
        <UserAvatarDetails />
      </Sidebar>
      <section className="relative mx-auto w-full flex-1 bg-[#F4F5F7]">
        <Header />
        <main className="mt-0 p-4 overflow-auto">{children}</main>
      </section>
    </div>
  );
};
