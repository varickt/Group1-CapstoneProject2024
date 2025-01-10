const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

// Predefined array of car makes and models
const carMakesAndModels = [
  { make: 'Toyota', model: 'Corolla' },
  { make: 'Honda', model: 'Civic' },
  { make: 'Ford', model: 'Mustang' },
  { make: 'Chevrolet', model: 'Camaro' },
  { make: 'BMW', model: '3 Series' },
  { make: 'Audi', model: 'A4' },
  { make: 'Mercedes-Benz', model: 'C-Class' },
  { make: 'Porsche', model: '911' },
  { make: 'Land Rover', model: 'Range Rover' },
  { make: 'Volkswagen', model: 'Jetta' },
  ];

async function main() {
  console.log("Seeding database with cars and users...");

  // Seed Users
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      },
    });
  }

  console.log("Users seeded!");

  // Seed Cars
  for (let i = 0; i < 10; i++) {
    const randomCar = carMakesAndModels[i % carMakesAndModels.length]; // Cycle through the array

    await prisma.car.create({
      data: {
        name: `${randomCar.make} ${randomCar.model}`,
        brand: randomCar.make,
        year: faker.date.past(30).getFullYear(), // Random year within the last 30 years
        price: parseFloat(faker.commerce.price(5000, 100000, 2)), // Random price between $5,000 and $100,000
        imageURL: "https://loremflickr.com/640/480/car", // will change to predetermined images
      },
    });
  }

  console.log("Cars seeded!");

  // Seed Reviews
  for (let i = 0; i < 10; i++) {
    // Fetch all users and cars
    const users = await prisma.user.findMany();
    const cars = await prisma.car.findMany();
  
    // Pick random user and car by generating random index
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomCar = cars[Math.floor(Math.random() * cars.length)];
  
    await prisma.review.create({
      data: {
        content: faker.lorem.sentences(3), // Random review content
        rating: faker.number.int({ min: 1, max: 5 }), // Random rating between 1 and 5
        userId: randomUser.id, // Random User ID
        carId: randomCar.id,   // Random Car ID
      },
    });
  }
  
  console.log("Reviews seeded!");

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