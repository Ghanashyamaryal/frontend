import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const DestinationDetails = () => {
    const { destinationId } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);
    const [recommendedDestinations, setRecommendedDestinations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDestinationDetails();
        fetchReviews();
    }, [destinationId])

    const fetchDestinationDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:4000/api/destination/${destinationId}`
            );
            setDestination(response.data);
            setRecommendedDestinations(response.data.recommendations || []);
            console.log(response.data)
        } catch (error) {
            setErrorMessage("Error fetching destination details.");
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/destination/${destinationId}/reviews`
            );
            setReviews(response.data || []);
        } catch (error) {
            setErrorMessage("Error fetching reviews.");
        }
    };

    const submitReview = async () => {
        if (rating === 0 || comment.trim() === "") {
            alert("Please provide a rating and comment.");
            return;
        }
        try {
            await axios.post(
                `http://localhost:4000/api/destination/${destinationId}/reviews`,
                { rating, comment }
            );
            setRating(0);
            setComment("");
            fetchReviews();
        } catch (error) {
            setErrorMessage("Error submitting review.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-6 px-6">
            {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0 w-full lg:w-1/2">
                        {destination?.profileImage ? (
                            <img
                                src={`/uploads/${destination.profileImage}`}
                                alt={destination?.name}
                                className="object-cover rounded-lg w-full h-80"
                            />
                        ) : (
                            <div className="bg-gray-300 w-full h-80 rounded-lg flex items-center justify-center">
                                <span className="text-gray-600">No Image Available</span>
                            </div>
                        )}
                    </div>

                    <div className="flex-grow w-full lg:w-2/3">
                        <h2 className="text-3xl font-bold text-red-600 mb-4">{destination?.name}</h2>

                        <div className="mb-4">
                            <span className="text-xl font-bold text-blue-600 mb-2">Location: </span>
                            <span className="text-gray-600">{`${destination.location?.city}, ${destination.location?.state}, ${destination.location?.country}`}</span>
                        </div>

                        <div className="mb-4">
                            <span className="text-green-800 font-bold">Rating: </span>
                            <span className="text-black font-bold">{destination.averageRating} / 5</span>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-blue-600 mb-2">Best Time to Visit:</h3>
                            <div className="flex items-center space-x-4">
                                {destination.bestTimeToVisit?.map((time, idx) => (
                                    <span
                                        key={idx}
                                        className="text-gray-600 text-xs bg-gray-200 px-2 py-1 rounded-md"
                                    >
                                        {time}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-blue-600 mb-2">Activities:</h3>
                            <div className="flex items-center space-x-4">
                                {destination.activities?.map((activity, idx) => (
                                    <span
                                        key={idx}
                                        className="text-gray-600 text-xs bg-gray-200 px-2 py-1 rounded-md"
                                    >
                                        {activity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold text-red-600 mb-2">Description</h3>
                    <p className="text-gray-600">{destination.description}</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-bold text-blue-600">Reviews</h3>
                <div>
                    {reviews.length === 0 ? (
                        <p className="text-gray-600">No reviews yet.</p>
                    ) : (
                        reviews.map((review, index) => (
                            <div key={index} className="border p-3 mt-2">
                                <p className="text-yellow-500 flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={i < review.rating ? "text-yellow-500" : "text-black"}
                                        />
                                    ))}{" "}
                                    {review.rating} / 5
                                </p>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-bold">Leave a Review</h3>
                <div className="flex space-x-2 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                            key={i}
                            className={`cursor-pointer text-3xl ${i < (hover || rating) ? "text-yellow-500" : "text-gray-300"}`}
                            onClick={() => setRating(i + 1)}
                            onMouseEnter={() => setHover(i + 1)}
                            onMouseLeave={() => setHover(rating)}
                        />
                    ))}
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review..."
                    className="border p-2 w-full mt-2 text-black"
                ></textarea>
                <button onClick={submitReview} className="bg-blue-600 text-white px-4 py-2 mt-2">
                    Submit
                </button>
            </div>

           <div className="mt-8">
    <h3 className="text-2xl font-bold text-blue-600 mb-4">Recommended Destinations</h3>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recommendedDestinations.length > 0 ? (
            recommendedDestinations.map((recDestination) => (
                <div
                    key={recDestination._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl w-full"
                >
                    <img
                        src={`/uploads/${recDestination.profileImage}`}
                        alt={recDestination.name}
                        onClick={() => navigate(`/destinations/${recDestination._id}`)}
                        className="w-full h-48 object-cover cursor-pointer"
                    />
                    <div className="p-4">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xl font-semibold text-gray-800">{recDestination.name}</h4>
                            <div className="text-yellow-600 flex items-center">
                                {recDestination.averageRating} <FaStar className="mr-1" />
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">{`${recDestination.location.city}, ${recDestination.location.country}`}</p>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-gray-600">No recommendations available.</p>
        )}
    </div>
</div>

            </div>
            );
};

            export default DestinationDetails;
