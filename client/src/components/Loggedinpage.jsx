import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Loggedinpage = () => {
  const [cars, setCars] = useState([]); // Car data including reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewsState, setReviewsState] = useState({}); // Store reviews for each car
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const navigate = useNavigate();

  // Fetch cars data along with reviews
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars");
        if (!response.ok) throw new Error("Failed to fetch cars");
        const data = await response.json();

        // Initialize the reviewsState for each car
        const initialReviewsState = data.reduce((acc, car) => {
          acc[car.id] = { content: "", rating: 1 };  // Default values for review
          return acc;
        }, {});
        setReviewsState(initialReviewsState);

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
      setUserToken(token);  // Store the token for use in review submission
    }
  }, []);

  const handleCarClick = (id) => {
    navigate(`/car/${id}`);
  };

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
        rating: Number(e.target.value),  // Ensure rating is a number
      },
    }));
  };

  const handleReviewSubmit = async (e, carId) => {
    e.preventDefault();

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

  const handleReviewClick = (e) => {
    // Stop the click event from propagating to the car card
    e.stopPropagation();
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

              {/* Review Section - Show only if the user is logged in */}
              {isLoggedIn && (
                <div onClick={handleReviewClick}>
                  <textarea
                    value={reviewsState[car.id]?.content || ""}
                    onChange={(e) => handleReviewContentChange(e, car.id)}
                    placeholder="Write a review..."
                  />
                  <div>
                    <label>Rating:</label>
                    <select
                      value={reviewsState[car.id]?.rating || 1}
                      onChange={(e) => handleRatingChange(e, car.id)}
                    >
                      {[1, 2, 3, 4, 5].map((rate) => (
                        <option key={rate} value={rate}>
                          {rate}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button onClick={(e) => handleReviewSubmit(e, car.id)}>
                    Submit Review
                  </button>
                </div>
              )}

              {/* Display Reviews */}
              <div className="reviews">
                <h4>Reviews:</h4>
                {car.reviews && car.reviews.length > 0 ? (
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
          ))
        ) : (
          <p>No cars available</p>
        )}
      </div>
    </div>
  );
};

export default Loggedinpage;