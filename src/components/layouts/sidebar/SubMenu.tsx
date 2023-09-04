"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { SubMenuTypes } from "@/types";

interface SubMenuProps {
  data: SubMenuTypes;
}

const SubMenu: React.FC<SubMenuProps> = ({ data }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <li
        className={`link ${pathname.includes(data.name) && "text-blue-600" ,"hover:bg-gray-100 text-primary rounded-lg"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.menus?.map((menu) => (
          <li key={menu.id}   className="hover:text-blue-600 hover:font-medium">
          
            <Link
              href={menu.url}
              className="link !bg-transparent capitalize"
            >
              {menu.label}
            </Link>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;