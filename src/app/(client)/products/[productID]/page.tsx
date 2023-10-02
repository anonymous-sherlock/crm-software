import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { Session } from "next-auth";
import { notFound } from "next/navigation";

async function getData({ productID }: { productID: string }) {
  const session = await getAuthSession();
  const { user } = session as Session;
  if (!user || !user.id) {
    return notFound();
  }
  // Retrieve the 'products' array property from the result
  const product = await db.product.findFirst({
    where: {
      ownerId: user.id,
      productId: productID,
    },
  });

  return product;
}
export default async function Page({
  params,
}: {
  params: { productID: string };
}) {
  const produt = await getData({ productID: params.productID });
  return <div>{JSON.stringify(produt)}</div>;
}
