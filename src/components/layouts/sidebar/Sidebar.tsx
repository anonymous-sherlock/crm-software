"use client";
import Logo from "@/assets/logo.png";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import SubMenu from "./SubMenu";
// * React icons
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menus, singleMenu, subMenusList } from "@/constants/MenuItems";
import useNavbarStore from "@/store/index";
import { ArrowLeftToLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SlSettings } from "react-icons/sl";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";

interface props {
  children: React.ReactNode;
}

const Sidebar = ({ children }: props) => {
  const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const { open, setOpen, setIsTabletMid } = useNavbarStore();

  // Update Zustand store values when the component mounts
  useEffect(() => {
    setIsTabletMid(isTabletMid);
    setOpen(!isTabletMid); // Set open to false for tablets
  }, [isTabletMid, setIsTabletMid, setOpen]);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <aside className="sticky top-0 z-[99] h-screen">
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[998] max-h-screen bg-black/50 md:hidden ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" text-gray fixed top-0  z-[999] h-screen w-[16rem] max-w-[16rem]  flex-1 
            overflow-hidden bg-white shadow-xl dark:bg-gray-700
         md:relative "
      >
        <div className="mx-3 flex items-center gap-2.5 border-b border-slate-300 py-3  font-medium">
          <Image
            src={Logo.src}
            width={40}
            height={40}
            alt="Adscrush"
            className="rounded-lg"
          />
          {open && (
            <span className="whitespace-pre text-xl font-bold">Adscrush</span>
          )}
        </div>

        <div className="flex h-screen flex-col ">
          <ul className="flex h-[70%] flex-col gap-1 overflow-x-hidden whitespace-pre  py-5 text-[0.9rem] font-medium md:h-[68%]">
            <ScrollArea className="h-full w-full border-none px-2.5">
              {Menus.map((menu, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 text-primary rounded-lg"
                >
                  <Link href={menu.url} className="link cursor-pointer">
                    <menu.icon size={23} className="min-w-max" />
                    {menu.label}
                  </Link>
                </li>
              ))}

              {(open || isTabletMid) && (
                <div className="border-y border-slate-300 py-5 ">
                  <small className="mb-2 inline-block pl-3 text-slate-500">
                    Products
                  </small>
                  {subMenusList?.map((menu, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <SubMenu data={menu} />
                    </div>
                  ))}
                </div>
              )}
              {singleMenu.map((menu, index) => (
                <li
                  key={index}
                  className={`${cn("hover:bg-gray-100 text-primary rounded-lg ")} ${menu.gap && "mt-2"  }`}
                >
                  <Link href={menu.url} className="link">
                    <menu.icon size={23} className="min-w-max" />
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ScrollArea>
          </ul>
          <div className="relative z-50 mb-14 mt-auto flex w-full flex-col	justify-end whitespace-pre text-sm font-medium">
            {/* collapse button */}
            <motion.div
              onClick={() => {
                setOpen(!open);
              }}
              transition={{ duration: 0 }}
              className="m-2 flex h-fit w-fit cursor-pointer justify-end self-end rounded-md border-2 border-gray-50 bg-secondary  p-2 ring-zinc-300 duration-300 hover:ring-2 focus:ring-2 md:block"
            >
              <ArrowLeftToLine
                size={25}
                className={`${!open && "rotate-180"}`}
              />
            </motion.div>
            {children}
            {open && (
              <div className="flex items-center justify-between border-y border-slate-300 p-4">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className=" cursor-pointer rounded-xl bg-teal-50 px-3 py-1.5 text-xs text-teal-500">
                  Upgrade
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
