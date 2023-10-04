import { serverClient } from "@/app/_trpc/serverClient";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getAuthSession } from "@/lib/authOption";
import Link from "next/link";
import { redirect } from "next/navigation";
import "server-only";
import { columns } from "./data-table/components/columns";
import { DataTable } from "./data-table/components/data-table";
import { Ghost } from "lucide-react";

async function getData() {
  const session = await getAuthSession();
  if (!session?.user || !session.user.id) {
    redirect("/login");
  }

  const products = await serverClient.getProducts();
  return products;
}

export default async function Page() {
  const products = await getData();

  return (
    <div className="">
      <ScrollArea className="w-full rounded-md" type="always">
        <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex bg-white rounded-lg border-1 border-gray-200">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of all your Products!
              </p>
            </div>
            <Link
              href="/products/create"
              className={buttonVariants({ size: "sm", variant: "outline" })}
            >
              Add a Product
            </Link>
          </div>
          {products.length === 0 ? (
            <div className="!mt-20 !mb-20 flex flex-col items-center gap-2">
              <Ghost className="h-8 w-8 text-zinc-800" />
              <h3 className="font-semibold text-xl">
                Pretty empty around here
              </h3>
              <p>Let&apos;s upload your first product.</p>
            </div>
          ) : (
            <DataTable data={products} columns={columns} />
          )}
        </div>
        <ScrollBar orientation="horizontal" className="w-full" />
      </ScrollArea>
    </div>
  );
}
