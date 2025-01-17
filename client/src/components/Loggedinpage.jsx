import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import Logo from "/images/logo4.png"; // Adjust path as needed
import "./loggedinpage.css";

const Loggedinpage = () => {
  const [cars, setCars] = useState([]); // Car data including reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch cars data along with reviews
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars");
        if (!response.ok) throw new Error("Failed to fetch cars");
        const data = await response.json();

        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCarClick = (carId, carImageURL) => {
    navigate(`/car-details/${carId}`, { state: { imageURL: carImageURL } });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredCars = cars.filter((car) =>
    `${car.brand} ${car.name}`.toLowerCase().includes(searchQuery)
  );

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="loggedinpage">
      <Navbar navigate={navigate} />

      <div className="welcome-section">
        <img src={Logo} alt="Car Judge Logo" className="welcome-logo" />
        <h1>Welcome to Car Judge!</h1>
        <p>
          We’re thrilled to have you join the Car Judge community, where honest
          opinions meet expert verdicts! Explore unbiased reviews, compare top
          contenders, and get expert insights that help you judge every car with
          confidence.
        </p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for cars..."
          className="search-box"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="cars-container">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              key={car.id}
              className="car-card"
              onClick={() => handleCarClick(car.id, car.imageURL)}
            >
              <img
                src={car.imageURL}
                alt={`${car.brand} ${car.name}`}
                className="car-image"
              />
              <h3>
                {car.brand} {car.name}
              </h3>
              <p>Year: {car.year}</p>
              <p>Price: ${car.price}</p>
            </div>
          ))
        ) : (
          <p>No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default Loggedinpage;