import { ProductCard } from "@/components/products/ProductCard";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getAuthSession } from "@/lib/authOption";
import { getAllProductsForUser } from "@/lib/dbAction";
import { ProductWithImagesPayload } from "@/types/db";
import "server-only";

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
  const data = await getData(); // Use the Product type here
  console.log(data);
  return (
    <div className="">
      <Breadcrumbs />

      <section className="grid grid-cols-3 gap-2 mt-4">
        {data.map((item) => (
          <ProductCard key={item.productId} product={item} />
        ))}
      </section>
    </div>
  );
}
