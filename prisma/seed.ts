import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seedProducts() {
  try {
    // Define the user's email for whom you want to seed products
    const userEmail = "akashcontentegy@gmail.com"; // Replace with the user's email

    // Find the user by email to get their ID
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      console.error("User not found");
      return;
    }

    // Define the number of products you want to create
    const numberOfProducts = 10; // Adjust this as needed

    const products = Array.from({ length: numberOfProducts }, () => ({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: parseFloat(faker.commerce.price()), // Parse price as a float
      quantity: faker.number.int({ min: 10, max: 100 }), // 57
      ownerId: user.id, // Set the ownerId to the user's ID obtained from the database
    }));

    // Insert the generated products into the database
    await prisma.product.createMany({
      data: products,
    });

    console.log(`${numberOfProducts} products seeded successfully`);
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
