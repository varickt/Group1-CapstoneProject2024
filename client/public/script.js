// JavaScript for changing images and reviews dynamically
const images = [
    { src: 'car1.png', review: '"Car Judge helps me decide which car to buy next." – Taylor R., First-Time Buyer' },
    { src: 'car2.png', review: '"A lifesaver when it comes to car shopping!" – Alex P., Enthusiast' },
    { src: 'car3.png', review: '"I love how easy it is to compare models." – Jamie L., Family Car Buyer' }
  ];
  
  let currentIndex = 0;
  
  // Function to change the image and review
  function changeImageAndReview() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById('car-image').src = images[currentIndex].src;
    document.getElementById('car-review').textContent = images[currentIndex].review;
  }
  
  // Set an interval to change every 3 seconds
  setInterval(changeImageAndReview, 3000);
  
  // Form Navigation: Switch between Login and Signup
  const signupLink = document.getElementById("signup-link");
  const loginLink = document.getElementById("login-link");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const signupPrompt = document.getElementById("signup-link-prompt");
  
  signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    signupPrompt.style.display = "none";
  });
  
  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    signupPrompt.style.display = "block";
  });
  
  // Forgot Password link functionality
  const forgotPasswordLink = document.getElementById("forgot-password-link");
  
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Forgot Password link clicked! Implement password reset flow here.");
  });
  