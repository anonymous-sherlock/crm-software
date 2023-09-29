import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seedProducts() {
  try {
    // Find the user by email to get their ID
    const user = await prisma.user.findFirst({});

    if (!user) {
      console.error("User not found");
      return;
    }

    // Define the number of products you want to create
    const numberOfProducts = 10; // Adjust this as needed

    for (let i = 0; i < numberOfProducts; i++) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          price: parseFloat(faker.commerce.price()), // Parse price as a float
          quantity: faker.number.int({ min: 10, max: 100 }), // 57
          ownerId: user.id, // Set the ownerId to the user's ID obtained from the database
        },
      });

      // Create the associated image for the product
      await prisma.productImage.create({
        data: {
          url: faker.image.url({ width: 200, height: 200 }),
          product: {
            connect: {
              productId: product.productId,
            },
          },
        },
      });
    }

    console.log(`${numberOfProducts} products seeded successfully`);
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
