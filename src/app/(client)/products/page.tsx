import "server-only";
import { ProductCard } from "@/components/products/ProductCard";
import { getAuthSession } from "@/lib/authOption";
import { getAllProductsForUser } from "@/lib/dbAction";
import { ProductWithImagesPayload } from "@/types/db";

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
  return (
    <div className="">
      <section className="grid grid-cols-3 gap-2 mt-4">
        {data.map((item) => (
          <ProductCard key={item.productId} product={item} />
        ))}
      </section>
    </div>
  );
}
