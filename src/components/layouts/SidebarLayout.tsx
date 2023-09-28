import React from "react";
import { Header } from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import UserAvatarDetails from "./sidebar/UserAvatarDetails";

type Props = {
  children: React.ReactNode;
};

export const SidebarLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-1 w-full bg-secondary dark:bg-primary">
      <Sidebar>
        <UserAvatarDetails />
      </Sidebar>
      <section className="relative mx-auto w-full flex-1 bg-secondary">
        <Header />
        <main className="mt-0 p-4 w-full">{children}</main>
      </section>
    </div>
  );
};
