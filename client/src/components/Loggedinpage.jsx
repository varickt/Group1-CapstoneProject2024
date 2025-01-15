import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loggedinpage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars"); // Ensure this matches your backend route
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

  const handleCarClick = (id) => {
    navigate(`/car/${id}`);
  };

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Cars</h1>
      <div className="cars-list">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="car-card" onClick={() => handleCarClick(car.id)}>
              <img src={car.imageURL} alt={`${car.brand} ${car.name}`} />
              <h3>{car.brand} {car.name}</h3>
              <p>Year: {car.year}</p>
              <p>Price: ${car.price}</p>
            </div>
          ))
        ) : (
          <p>No cars available</p>
        )}
      </div>
    </div>
  );
};

export default Loggedinpage;