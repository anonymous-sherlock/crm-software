import "server-only";
import { ProductCard } from "@/components/products/ProductCard";
import { getAuthSession } from "@/lib/authOption";
import { getAllProductsForUser } from "@/lib/dbAction";
import { ProductWithImagesPayload } from "@/types/db";
import { DataTable } from "./data-table/components/data-table";
import { columns } from "./data-table/components/columns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

async function getData() {
  const session = await getAuthSession();
  if (!session) {
    return [];
  }
  // Retrieve the 'products' array property from the result
  const productsData = await getAllProductsForUser(session.user.id);
  const products = productsData as ProductWithImagesPayload[];
  return products || []; // Return an empty array if products is null
}

export default async function Page() {
  const products = await getData(); // Use the Product type here
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
          </div>
          <DataTable data={products} columns={columns} />
        </div>
        <ScrollBar orientation="horizontal" className="w-full" />
      </ScrollArea>
      {/* <section className="grid grid-cols-3 gap-2 mt-4">
        {products.map((item) => (
          <ProductCard key={item.productId} product={item} />
        ))}
      </section> */}
    </div>
  );
}
