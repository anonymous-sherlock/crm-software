import { Prisma } from "@prisma/client";

// 1: Define a type that includes the relation to `Post`
const productWithImages = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    products: {
      include: {
        images: true,
      },
    },
  },
});

type productWithImages = Prisma.UserGetPayload<typeof productWithImages>;
