import "server-only";
import { db } from "./db";

export const getAllProductsForUser = async (userId: string) => {
  try {
    const userProducts = await db.user.findFirst({
      where: {
        id: { equals: userId.toLowerCase() },
      },
      select: {
        products: true,
      },
    });

    return userProducts;
  } catch (error) {
    console.error("Error fetching products for user:", error);
    throw error; // You can handle or log the error further if needed
  }
};
