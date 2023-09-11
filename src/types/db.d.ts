import { Prisma } from "@prisma/client";

// 1: Define a type that includes the relation to `Post`
export type ProductWithImagesPayload = Prisma.ProductGetPayload<{
  include: {
    images: true; // Include the 'images' relation
  };
}>;
