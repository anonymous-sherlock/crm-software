"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

type Props = {};

export const Breadcrumbs = (props: Props) => {
  const pathname = usePathname().substring(1);
  return (
    <div className="text-base font-medium text-gray-700">
      <span>
        <Link href={"/"} className="duration-300 hover:text-blue-700">Home</Link>{" "}
      </span>
      &raquo;  {pathname}
    </div>
  );
};
