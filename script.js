const BASE_URL = "http://localhost:5000"; // Replace with your backend URL

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, { username, password });
    alert("Login successful!");
    localStorage.setItem("token", res.data.token); // Save token for authenticated requests
  } catch (err) {
    alert("Login failed: " + err.response.data.message);
  }
});

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    await axios.post(`${BASE_URL}/auth/signup`, { username, email, password });
    alert("Sign up successful!");
  } catch (err) {
    alert("Sign up failed: " + err.response.data.message);
  }
});

async function fetchCars() {
    try {
      const res = await axios.get(`${BASE_URL}/cars`);
      const cars = res.data;
  
      const carsContainer = document.getElementById("cars-container");
      carsContainer.innerHTML = ""; // Clear previous content
  
      cars.forEach((car) => {
        const carCard = document.createElement("div");
        carCard.className = "car-card";
        carCard.innerHTML = `
          <h3>${car.make} ${car.model} (${car.year})</h3>
          <button onclick="viewReviews('${car._id}')">View Reviews</button>
          <button onclick="addReview('${car._id}')">Add Review</button>
        `;
        carsContainer.appendChild(carCard);
      });
    } catch (err) {
      console.error("Error fetching cars:", err.message);
    }
  }
  
  fetchCars(); // Call this function on page load

  async function addReview(carId) {
    const review = prompt("Enter your review:");
    const token = localStorage.getItem("token");
  
    try {
      await axios.post(
        `${BASE_URL}/cars/${carId}/review`,
        { review, username: "YourUsername" }, // Replace with logged-in user info
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review added!");
      fetchCars(); // Refresh cars
    } catch (err) {
      console.error("Error adding review:", err.message);
    }
  }
  
  async function viewReviews(carId) {
    try {
      const res = await axios.get(`${BASE_URL}/cars/${carId}`);
      const car = res.data;
  
      const reviewsContainer = document.getElementById("reviews-container");
      reviewsContainer.innerHTML = ""; // Clear previous reviews
  
      car.reviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.className = "review-card";
        reviewCard.innerHTML = `
          <p><strong>${review.username}</strong>: ${review.review}</p>
          <button onclick="addComment('${carId}', '${review._id}')">Add Comment</button>
        `;
  
        review.comments.forEach((comment) => {
          reviewCard.innerHTML += `<p><em>${comment.username}</em>: ${comment.comment}</p>`;
        });
  
        reviewsContainer.appendChild(reviewCard);
      });
    } catch (err) {
      console.error("Error fetching reviews:", err.message);
    }
  }
  
  async function addComment(carId, reviewId) {
    const comment = prompt("Enter your comment:");
    const token = localStorage.getItem("token");
  
    try {
      await axios.post(
        `${BASE_URL}/cars/${carId}/review/${reviewId}/comment`,
        { comment, username: "YourUsername" }, // Replace with logged-in user info
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Comment added!");
      viewReviews(carId); // Refresh reviews
    } catch (err) {
      console.error("Error adding comment:", err.message);
    }
  }
  