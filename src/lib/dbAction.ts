import "server-only";
import { db } from "./db";
import { ProductWithImagesPayload } from "@/types/db";

export const getAllProductsForUser = async (
  userId: string
): Promise<ProductWithImagesPayload[]> => {
  try {
    const userProducts = await db.product.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        images: true, // Include the 'images' relation
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return userProducts;
  } catch (error) {
    throw error;
  }
};
