"use client";
import Image from "next/image";
import { useState } from "react";
import Logo from "@/assets/logo.png";
import { Menus } from "@/constants/MenuItems";
import controllerIcon from "@/assets/control.png";
import { BiChevronLeft } from "react-icons/bi";
import Link from "next/link";

const Sidebar2 = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-primary min-h-screen h-full p-5  pt-8  relative duration-300`}
      >
        <div
          className="absolute cursor-pointer -right-3 top-9 w-7 h-7 border-primary 
           border-2 rounded-full"
        ></div>
        <BiChevronLeft
          size={26}
          className={`absolute cursor-pointer -right-3 top-9 w-7 bg-white text-primary border-primary z-40
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <Image
            src={Logo.src}
            width={60}
            height={60}
            style={{ objectFit: "contain" }}
            alt=""
            className={`cursor-pointer duration-500 w-10 h-10 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Adscrush
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link key={index} href={Menu.url}>
              <li
                className={`flex rounded-md p-2 cursor-pointer  transition-all duration-200 hover:bg-white hover:text-primary bg-opacity-25 text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-primary bg-opacity-10"
                } `}
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
    </div>
  );
};
export default Sidebar2;
