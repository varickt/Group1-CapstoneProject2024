import React from "react";
import Navbar from "./Navbar"; // Import Navbar component
import Logo from "../images/Logo2.png"; // Adjust the path to your logo image
import "./About.css"; // Import CSS for styling

const About = () => {
  return (
    <div className="about-page">
      {/* Navbar remains at the top */}
      <Navbar />
      {/* Welcome section with logo and long paragraph */}
      <section className="welcome-section">
        <img src={Logo} alt="App Logo" className="welcome-logo" />
        <h1>About Us</h1>
        <p>
          Welcome to our site! What started as a small project has now grown
          into a platform that we are extremely proud of. Our journey began with
          a simple idea: to create a space where car enthusiasts could come
          together, share their passion, and find the best deals on their dream
          cars.
        </p>
        <p>
          We recognized a gap in the market for a comprehensive platform that
          not only lists cars but also provides detailed reviews, ratings, and a
          community for car lovers to exchange their experiences. With this
          vision in mind, we set out to build a user-friendly, informative, and
          engaging site that caters to all your automotive needs.
        </p>
        <p>
          Our dedicated team has worked tirelessly to ensure that our platform
          is equipped with the latest features and technology to provide you
          with an unparalleled user experience. We believe in constant
          innovation and improvement, and we are always looking for ways to
          enhance our services based on your feedback and suggestions.
        </p>
        <p>
          Thank you for being a part of our journey. We hope you enjoy using our
          site as much as we enjoyed creating it for you. Your support and
          enthusiasm inspire us to keep pushing the boundaries and delivering
          the best possible experience.
        </p>
      </section>
    </div>
  );
};

export default About;
