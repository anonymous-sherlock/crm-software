"use client";
import Logo from "@/assets/logo.png";
import { Menus } from "@/constants/MenuItems";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar = ({ children }: SidebarProps) => {
  const [open, setOpen] = useState(true);

  return (
    <PerfectScrollbar>
      <nav className=" flex">
        <aside className="sticky top-0 z-50 h-screen overflow-x-hidden overflow-y-scroll bg-primary">
          {/* Sidenav menu logo sticky */}
          <section
            className={` ${
              open ? "w-72" : "w-20 "
            } relative bg-primary duration-300`}
          >
            <div
              className={` fixed inset-0 top-0 mb-auto flex h-20 items-center gap-x-4 bg-gray-200 p-4 duration-300 ${
                open ? "left-0 w-72" : "w-20 "
              }`}
            >
              <Link href="/">
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
              </Link>
              <h1
                className={`origin-left text-xl font-medium text-white duration-200 ${
                  !open && "scale-0"
                }`}
              >
                Adscrush
              </h1>
              <div className="right-0 top-10 z-50 ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-primary">
                <BiChevronLeft
                  size={26}
                  className={`absolute  z-40 w-7 cursor-pointer rounded-full border-2 border-primary
           bg-white text-primary  ${!open && "rotate-180"}`}
                  onClick={() => setOpen(!open)}
                />
              </div>
            </div>
          </section>

          {/*Sidenav menu section */}
          <section>
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
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {Menu.title}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </section>
        </aside>

        <main className="relative min-h-screen flex-1 bg-secondary">
          {children}
        </main>
      </nav>
    </PerfectScrollbar>
  );
};
export default Sidebar;
