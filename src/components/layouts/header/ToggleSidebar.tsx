"use client";
import useNavbarStore from "@/store/index";
import React, { useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";

type Props = {};

const ToggleSidebar = (props: Props) => {
  const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const { open, setOpen, setIsTabletMid } = useNavbarStore();

  // Update Zustand store values when the component mounts
  useEffect(() => {
    setIsTabletMid(isTabletMid);
    setOpen(!isTabletMid); // Set open to false for tablets
  }, [isTabletMid, setIsTabletMid, setOpen]);

  const toggleNavbar = () => {
    setOpen(!open);
  };

  return (
    <div className="cursor pointer m-3 md:hidden " onClick={toggleNavbar}>
      <HiOutlineMenuAlt2 size={25} />
    </div>
  );
};

export default ToggleSidebar;
