import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./carDetails.css";

const CarDetails = () => {
  const [reviewsState, setReviewsState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { carId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  // Handle review content change
  const handleReviewContentChange = (e, carId) => {
    setReviewsState((prevState) => ({
      ...prevState,
      [carId]: {
        ...prevState[carId],
        content: e.target.value,
      },
    }));
  };

  // Handle rating change
  const handleRatingChange = (e, carId) => {
    setReviewsState((prevState) => ({
      ...prevState,
      [carId]: {
        ...prevState[carId],
        rating: Number(e.target.value),
      },
    }));
  };

  // Submit a review
  const handleReviewSubmit = async (e, carId) => {
    e.preventDefault();
    const userToken = localStorage.getItem("token");
    const { content, rating } = reviewsState[carId];

    if (!content || !rating) {
      setError("Please provide both a review and a rating.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ carId, content, rating }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      const updatedReview = await response.json();

      // Update car reviews state
      setCar((prevCar) => ({
        ...prevCar,
        reviews: [...prevCar.reviews, updatedReview],
      }));

      setReviewsState((prevState) => ({
        ...prevState,
        [carId]: { content: "", rating: 1 },
      }));

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cars/${carId}`);
        if (!response.ok) throw new Error("Failed to fetch car details");
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  if (loading) return <p>Loading car details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="car-details-page">
      {/* Navbar */}
      <nav className="navbar">
        <h2 onClick={() => navigate("/loggedinpage")} className="nav-home">
          Home
        </h2>
      </nav>

      <div className="car-header">
        <h1>{car.name}</h1>
        <p>{car.description}</p>
      </div>

      <div className="car-image">
        <img src={car.image} alt={car.name} />
      </div>

      {/* Reviews Section */}
      {isLoggedIn && (
        <div className="review-section">
          <h2>Write a Review</h2>
          <textarea
            className="review-textarea"
            value={reviewsState[carId]?.content || ""}
            onChange={(e) => handleReviewContentChange(e, carId)}
            placeholder="Write your review here..."
          />
          <div className="rating-select">
            <label>Rating:</label>
            <select
              value={reviewsState[carId]?.rating || 1}
              onChange={(e) => handleRatingChange(e, carId)}
            >
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>
          <button className="submit-review-btn" onClick={(e) => handleReviewSubmit(e, carId)}>
            Submit Review
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}

      <div className="reviews">
        <h2>Reviews</h2>
        {Array.isArray(car.reviews) && car.reviews.length > 0 ? (
          car.reviews.map((review, index) => (
            <div key={index} className="review">
              <p>{review.content}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to write one!</p>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
