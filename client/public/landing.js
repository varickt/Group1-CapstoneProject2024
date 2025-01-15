// JavaScript for Landing Page Animation
window.onload = () => {
    const car = document.getElementById('car');
    const logoContainer = document.getElementById('logo-container');
    const logo = document.getElementById('logo');
  
    // Animate the car
    setTimeout(() => {
      car.style.left = '50%'; // Move car to the center
      car.style.transform = 'translateX(-50%) scale(1.5)'; // Zoom the car
    }, 500);
  
    // Show the logo after the car animation
    setTimeout(() => {
      car.style.display = 'none'; // Hide the car
      logoContainer.style.display = 'block'; // Show the logo container
      logo.style.opacity = '1'; // Fade in the logo
    }, 3500); // Matches the car animation timing
  };
  