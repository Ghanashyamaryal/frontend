import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const HotelDetails = () => {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [recommendedHotels, setRecommendedHotels] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const amenities = ["Free_Wifi", "Geyser", "Card_payment", "CCTV", "Dining_area"];

    useEffect(() => {
        fetchHotelDetails();
        fetchReviews();
    }, [hotelId]);

    const fetchHotelDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotel/${hotelId}`);
            setHotel(response.data.hotel);
            setRecommendedHotels(response.data.recommendedHotels);
        } catch (error) {
            setErrorMessage("Error fetching hotel details.");
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotel/${hotelId}/reviews`);
            setReviews(response.data || []);
        } catch (error) {
            setErrorMessage("Error fetching reviews.");
        } finally {
            setLoading(false);
        }
    };

    const submitReview = async () => {
        if (rating === 0 || comment.trim() === "") {
            alert("Please provide a rating and comment.");
            return;
        }
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/hotel/${hotelId}/reviews`, {
                rating,
                comment,
            });
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
            {errorMessage && (
                <div className="text-red-600 mb-4">{errorMessage}</div>
            )}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0 w-full lg:w-1/2">
                        <img
                            src={`/uploads/${hotel?.profileImage}`}
                            alt={hotel?.name}
                            className="object-cover rounded-lg w-full h-80"
                        />
                    </div>
                    <div className="flex-grow w-full lg:w-2/3">
                        <h2 className="text-3xl font-bold text-red-600 mb-4">{hotel?.name}</h2>
                        <div className="mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="text-green-600 font-bold text-sm">
                                    {hotel?.averageRating} <FaStar className="inline-block" />
                                </div>
                                <div className="text-gray-600 text-sm">
                                    -{hotel?.status || "Good"}
                                </div>
                                <div className="text-green-600 font-bold text-sm">
                                    {`- ${hotel?.starRating} Star Hotel`}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="text-xl font-bold text-blue-600 mb-2">Address: </span>
                            <span className="text-gray-600">{`${hotel?.address?.street}, ${hotel?.address?.country}`}</span>
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                            {amenities?.map((amenity, idx) => (
                                <span
                                    key={idx}
                                    className="text-gray-600 text-xs bg-gray-200 px-2 py-1 rounded-md"
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                        <div className="mb-4">
                            <span className="text-green-800 font-bold">Phone: </span>
                            <span className="text-black font-bold">{hotel?.phone}</span>
                            <p className="text-gray-600 py-3">
                                Website:{" "}
                                <a href={hotel?.website} className="text-blue-600 underline">
                                    {hotel?.website}
                                </a>
                            </p>
                        </div>

                        <div>
                            <span className="text-xl font-bold text-red-600 mb-2">Price Range: </span>
                            <span className="text-gray-800 font-bold">
                                NPR {`${hotel?.priceRange?.min} - ${hotel?.priceRange?.max}`}
                            </span>
                        </div>

                        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mt-6">
                            Book Now
                        </button>

                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-red-600 mb-2">Description</h3>
                    <p className="text-gray-600">{hotel?.description}</p>
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
                            className={`cursor-pointer text-3xl ${i < (hover || rating) ? "text-yellow-500" : "text-gray-300"
                                }`}
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
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Recommended Hotels</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {recommendedHotels.length > 0 ? (
                        recommendedHotels.map((recHotel) => (
                            <div
                                key={recHotel._id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl w-full" // Full width of the grid cell
                            >
                                <img
                                    src={`/uploads/${recHotel.profileImage}`}
                                    alt={recHotel.name}
                                    onClick={() => navigate(`/hotels/${recHotel._id}`)}
                                    className="w-full h-48 object-cover cursor-pointer"
                                />
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-xl font-semibold text-gray-800">{recHotel.name}</h4>
                                        <div className="text-yellow-600 flex items-center">
                                            {recHotel.averageRating} <FaStar className="mr-1" />
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm">{`${recHotel.address.city}, ${recHotel.address.state}, ${recHotel.address.country}`}</p>
                                    <div className="text-red-800 font-semibold text-lg">
                                        Price: {`NPR ${recHotel.priceRange.min} - ${recHotel.priceRange.max}`}
                                    </div>
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

export default HotelDetails;
