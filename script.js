// Rotating Car Images and Reviews
const carImages = [
  "Images/car1.png",
  "Images/car2.png",
  "Images/car3.png",
  "Images/car4.png",
];

const reviews = [
  { text: '"Car Judge is a fantastic platform to share opinions on cars!"', author: "— Alex M., Car Enthusiast" },
  { text: '"Absolutely love the detailed reviews I find here!"', author: "— Jamie L., Auto Dealer" },
  { text: '"Car Judge helps me decide which car to buy next."', author: "— Taylor R., First-Time Buyer" },
  { text: '"The car images and reviews make this site a joy to use."', author: "— Sam K., Photographer" },
  { text: '"I recommend Car Judge to all my friends."', author: "— Riley T., Gearhead" }
];

let currentIndex = 0;

function rotateContent() {
  const carImage = document.getElementById("car-image");
  const reviewText = document.getElementById("review-text");
  const reviewAuthor = document.getElementById("review-author");

  // Update car image
  carImage.src = carImages[currentIndex];

  // Update review text
  reviewText.textContent = reviews[currentIndex].text;
  reviewAuthor.textContent = reviews[currentIndex].author;

  // Increment index for next rotation
  currentIndex = (currentIndex + 1) % carImages.length;
}

// Rotate every 5 seconds
setInterval(rotateContent, 5000);
