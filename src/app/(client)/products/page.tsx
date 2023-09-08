import "server-only";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { Session } from "next-auth";
import { getAllProductsForUser } from "@/lib/dbAction";
import { Product } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type ProductData = {
  productId: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  ownerId: string;
};
async function getData() {
  const session = await getServerSession(authOptions);
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
