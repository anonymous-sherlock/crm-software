import "server-only";
import { db } from "./db";
import { ProductWithImagesPayload } from "@/types/db";

export const getAllProductsForUser = async (
  userId: string
): Promise<ProductWithImagesPayload[]> => {
  try {
    const userProducts = await db.product.findMany({
      where: {
        ownerId: userId, // Replace with the ownerId you're interested in
      },
      include: {
        images: true, // Include the 'images' relation
      },
    });

    return userProducts;
  } catch (error) {
    console.error("Error fetching products for user:", error);
    throw error; // You can handle or log the error further if needed
  }
};
