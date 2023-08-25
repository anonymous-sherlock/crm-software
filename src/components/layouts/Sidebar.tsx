"use client";
import Logo from "@/assets/logo.png";
import { Menus } from "@/constants/MenuItems";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar = ({ children }: SidebarProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className=" flex">
      <aside className="sticky top-0 z-50 h-screen overflow-x-hidden overflow-y-scroll bg-primary">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } relative h-full bg-primary p-5 py-8 duration-300`}
        >
          <div
            className="sticky flex items-center justify-center top-9 h-7 w-7 cursor-pointer rounded-full ml-auto border-2 border-primary z-50"
          >
            <BiChevronLeft
              size={26}
              className={`absolute  z-40 w-7 cursor-pointer rounded-full border-2 border-primary
           bg-white text-primary  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
          </div>

          <div className="flex items-center gap-x-4">
            <Image
              src={Logo.src}
              width={60}
              height={60}
              style={{ objectFit: "contain" }}
              alt=""
              className={`h-10 w-10 cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`origin-left text-xl font-medium text-white duration-200 ${
                !open && "scale-0"
              }`}
            >
              Adscrush
            </h1>
          </div>
          <ul className="pb-6 pt-6">
            {Menus.map((Menu, index) => (
              <Link key={index} href={Menu.url}>
                <li
                  className={`flex cursor-pointer items-center gap-x-4  rounded-md bg-opacity-25 p-2 text-sm text-gray-300 transition-all duration-200 hover:bg-white hover:text-primary ${
                    Menu.gap ? "mt-9" : "mt-2"
                  } ${index === 0 && "bg-primary bg-opacity-10"} `}
                >
                  <Menu.icon size={26} />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </aside>

      <main className=" relative min-h-screen flex-1 bg-secondary">
        {children}
      </main>
    </div>
  );
};
export default Sidebar;
