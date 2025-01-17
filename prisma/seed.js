const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

const carImages = {
  "Toyota Corolla": "https://tse4.mm.bing.net/th?id=OIP.Bft4vJHz9arpyg55QIzrGgHaDt&pid=Api&P=0&h=220",
  "Honda Civic": "https://tse1.mm.bing.net/th?id=OIP.eRPSPy-tYD0yz7Hi8JRiQQHaEK&pid=Api&P=0&h=220",
  "Ford Mustang": "https://tse4.mm.bing.net/th?id=OIP.cWRhX4cOYk74_dr_p4zVtwHaE1&pid=Api&P=0&h=220",
  "Chevrolet Camaro": "https://tse1.mm.bing.net/th?id=OIP.yTi4lfncDtcglq_kQ9aQFQHaEK&pid=Api&P=0&h=220",
  "BMW 3 Series": "https://tse3.mm.bing.net/th?id=OIP.VLdQIb5P-RBIgEmmgmWYPQHaE8&pid=Api&P=0&h=220",
  "Audi A4": "https://tse3.mm.bing.net/th?id=OIP.aV3NyjpjJ25Lv1Hec1wBBQHaE8&pid=Api&P=0&h=220",
  "Mercedes-Benz C-Class": "https://tse2.mm.bing.net/th?id=OIP.OtqqxS-zK2gy3oFJ7VnRywHaE8&pid=Api&P=0&h=220",
  "Porsche 911": "https://tse2.mm.bing.net/th?id=OIP.CKbWjwto8jXYudRkg44CkAHaEc&pid=Api&P=0&h=220",
  "Land Rover Range Rover": "https://tse1.mm.bing.net/th?id=OIP.j8K7q670TfVZT1dwKF4tAQHaEK&pid=Api&P=0&h=220",
  "Volkswagen Jetta": "https://tse4.mm.bing.net/th?id=OIP.iTN9QAsM0RFrBs-4E2g_GwHaE8&pid=Api&P=0&h=220",

};
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
  console.log('Seeding database with cars and users...');

  // Seed Users
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(), // Generate fake email
        password: faker.internet.password(),
      },
    });
  }

  console.log('Users seeded!');

  // Seed Cars
  for (let i = 0; i < 10; i++) {
    const randomCar = carMakesAndModels[i % carMakesAndModels.length]; // Cycle through the array
    const carName = randomCar.model; // Model is the name
    const carBrand = randomCar.make; // Make is the brand

    await prisma.car.create({
      data: {
        name: carName, // Assign model as name
        brand: carBrand, // Assign make as brand
        year: faker.date.past(30).getFullYear(), // Random year within the last 30 years
        price: parseFloat((Math.random() * (100000 - 5000) + 5000).toFixed(2)), // Random price between $5,000 and $100,000
        imageURL: carImages[`${carBrand} ${carName}`] || "https://example.com/default-car.jpg", // Default image if no match
      },
    });
  }

  console.log('Cars seeded!');

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
        carId: randomCar.id, // Random Car ID
      },
    });
  }

  console.log('Reviews seeded!');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });