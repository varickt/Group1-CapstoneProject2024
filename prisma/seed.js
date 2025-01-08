const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with cars and users...");

  // Create 5 users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.username(),
        password: faker.internet.password(),
      },
    });
    users.push(user);
  }

  console.log("Users seeded!");

  // Seed cars and generate reviews for each car
  const cars = [];
  for (let i = 0; i < 50; i++) {
    const car = await prisma.car.create({
      data: {
        name: `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
        brand: faker.vehicle.manufacturer(),
        year: faker.date.past(30).getFullYear(),
        price: parseFloat(faker.commerce.price(5000, 100000, 2)),
        imageURL: `https://loremflickr.com/640/480/car?random=${Math.random()}`,
      },
    });

    // Generate 3 random reviews for each car
    for (let j = 0; j < 3; j++) {
      await prisma.review.create({
        data: {
          content: faker.lorem.sentence(),
          rating: faker.number.int({ min: 1, max: 5 }), // Using faker.number.int()
          userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id, // Randomly assign a user
          carId: car.id,
        },
      });
    }

    cars.push(car);
  }

  console.log("Cars and reviews seeded!");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });