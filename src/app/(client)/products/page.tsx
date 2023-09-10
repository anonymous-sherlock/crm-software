import "server-only";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getAuthSession } from "@/lib/authOption";
import { getAllProductsForUser } from "@/lib/dbAction";
import { Product } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type ProductData = {
  productId: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  ownerId: string;
};
async function getData() {
  const session = await getAuthSession()
  if (!session) {
    return [];
  }
  // Retrieve the 'products' array property from the result
  const result = await getAllProductsForUser(session.user.id);
  const products: Product[] | null = result?.products || null;

  return products || []; // Return an empty array if products is null
}

export default async function Page() {
  const data: ProductData[] = await getData();
  console.log(data);
  return (
    <div className="">
      <Breadcrumbs />

      <DataTable columns={columns} data={data} />
    </div>
  );
}
