import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loggedinpage = () => {
  const [cars, setCars] = useState([]); // Car data including reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const navigate = useNavigate();
  const [selectedCarId, setSelectedCarId] = useState(null);

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

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUserToken(token); // Store the token for use in review submission
    }
  }, []);

  const handleCarClick = (carId) => {
    navigate(`/car-details/${carId}`);
    // setSelectedCarId(carId);
  };

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Cars</h1>
      <div className="cars-list">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div
              key={car.id}
              className="car-card"
              onClick={() => handleCarClick(car.id)}
            >
              <img src={car.imageURL} alt={`${car.brand} ${car.name}`} />
              <h3>
                {car.brand} {car.name}
              </h3>
              <p>Year: {car.year}</p>
              <p>Price: ${car.price}</p>
            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default Loggedinpage;
