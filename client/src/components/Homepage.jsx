import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar"; // Shared Navbar component
import Logo from "/images/Logo2.png";

const Homepage = () => {
  const carImages = [
    { src: "./images/car1.png", quote: "Car Judge is the best site for car reviews!" },
    { src: "./images/car2.png", quote: "Honest and reliable reviews, every time." },
    { src: "./images/car3.png", quote: "Finding my dream car was easy with Car Judge." },
    { src: "./images/car4.png", quote: "Trustworthy and informative—Car Judge rocks!" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div>
      {/* Single Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="homepage-container">
        {/* Left Column */}
        <div className="left-column">
          <img src={Logo} alt="Car Judge Logo" className="large-logo" />
          <div className="auth-box">
            <h1>Welcome to Car Judge</h1>
            <p>Your go-to destination for honest car reviews and ratings.</p>
            <div className="cta-buttons">
              <button
                className="btn primary"
                onClick={() => (window.location.href = "/sign-in")}
              >
                Sign In
              </button>
              <button
                className="btn secondary"
                onClick={() => (window.location.href = "/register")}
              >
                Register
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <Slider {...settings} className="carousel">
            {carImages.map((car, index) => (
              <div key={index} className="carousel-slide">
                <img src={car.src} alt={`Car ${index + 1}`} className="carousel-image" />
                <p className="carousel-quote">{car.quote}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
