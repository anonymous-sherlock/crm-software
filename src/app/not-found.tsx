import { Icons } from "@/assets/Icons";
import { buttonVariants } from "@/components/ui/button";
import LargeHeading from "@/components/ui/large-heading";
import Paragraph from "@/components/ui/paragraph";
import Link from "next/link";
import { FC } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adscrush CRM | Page not found",
  description: "Maketing Agency to ",
};

const PageNotFound: FC = () => {
  return (
    <section className="container pt-32 max-w-7xl mx-auto text-center flex flex-col gap-6 items-center">
      <LargeHeading>Site not found...</LargeHeading>
      <Paragraph>The site you&apos;re searching for does not exist.</Paragraph>
      <Link
        className={buttonVariants({
          variant: "ghost",
          className: "w-fit",
        })}
        href="/"
      >
        <Icons.ChevronLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>
    </section>
  );
};

export default PageNotFound;
