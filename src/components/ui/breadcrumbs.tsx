"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

type Props = {};

export const Breadcrumbs = (props: Props) => {
  const pathname = usePathname().substring(1);

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-medium text-black text-opacity-70 dark:text-white capitalize">
        {pathname
          .trim()
          .split("/")
          .map((part, index, array) => (
            <React.Fragment key={index}>
              {index === 0 ? array[0] : null}{" "}
            </React.Fragment>
          ))}{" "}
        Overview
      </h2>
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Home /
            </Link>
          </li>
          {pathname
            .trim()
            .split("/")
            .map((part, index, array) => (
              <li key={index} className="font-medium">
                <Link
                  className="font-medium hover:text-primary"
                  href={`/${array.slice(0, index + 1).join("/")}`}
                >
                  {part}{" "}
                  {index !== array.length - 1 && (
                    <span className="text-black">{" /"}</span>
                  )}
                </Link>
              </li>
            ))}
        </ol>
      </nav>
    </div>
  );
};
