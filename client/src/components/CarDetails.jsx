import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const [reviewsState, setReviewsState] = useState({}); // Store reviews for each car
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]); // Car data including reviews
  const [error, setError] = useState(null);
  const { carId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [car, setCar] = useState([]); // Initialize state to null
  const [selectedCarId, setSelectedCarId] = useState(null);
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
        rating: Number(e.target.value), // Ensure rating is a number
      },
    }));
  };

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
        body: JSON.stringify({
          carId,
          content,
          rating,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const updatedReview = await response.json(); // Newly added review from API

      // Update the specific car's reviews in the state
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === carId
            ? {
                ...car,
                reviews: [...car.reviews, updatedReview], // Add new review to existing reviews
              }
            : car
        )
      );

      // Reset the review form
      setReviewsState((prevState) => ({
        ...prevState,
        [carId]: { content: "", rating: 1 },
      }));

      setError(null); // Reset error state if the submission is successful
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cars/${carId}`);
        if (!response.ok) throw new Error("Failed to fetch car");
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

  const handleReviewClick = (e) => {
    // Stop the click event from propagating to the car card
    e.stopPropagation();
  };

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1>Car Details</h1>
      {/* Review Section - Show only if the user is logged in */}
      {isLoggedIn && car && (
        <div onClick={handleReviewClick}>
          <textarea
            value={reviewsState[car.carId]?.content || ""}
            onChange={(e) => handleReviewContentChange(e, car.carId)}
            placeholder="Write a review..."
          />
          <div>
            <label>Rating:</label>
            <select
              value={reviewsState[car.carId]?.rating || 1}
              onChange={(e) => handleRatingChange(e, car.carId)}
            >
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>
          <button onClick={(e) => handleReviewSubmit(e, car.carId)}>
            Submit Review
          </button>
        </div>
      )}
      {/* Display Reviews */}
      <div className="reviews">
        <h4>Reviews:</h4>
        {Array.isArray(car.reviews) && car.reviews.length > 0 ? (
          car.reviews.map((review, index) => (
            <div key={index}>
              <p>{review.content}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};
export default CarDetails;
