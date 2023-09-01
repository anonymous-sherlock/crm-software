import React from "react";
import { Header } from "./header/Header";
import Sidebar2 from "./sidebar/SideBar-2";

type Props = {
  children: React.ReactNode;
};

export const SidebarLayout = ({ children }: Props) => {
  return (
    <div className="flex bg-secondary dark:bg-primary">
      <Sidebar2 />
      <main className="relative mx-auto w-full flex-1">
        <Header />
        {children}

      </main>
    </div>
  );
};
