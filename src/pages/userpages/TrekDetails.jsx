import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TrekDetails = () => {
    const { trekId } = useParams();
    const navigate = useNavigate();
    const [trek, setTrek] = useState(null);
    const [recommendedTreks, setRecommendedTreks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchTrekDetails();
    }, [trekId]);

    const fetchTrekDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/trek/${trekId}`);
            setTrek(response.data);
            fetchRecommendedTreks(response.data);
        } catch (error) {
            console.error("Error fetching trek details:", error);
            setErrorMessage("Error fetching trek details. Please try again later.");
        }
    };

    const fetchRecommendedTreks = async (currentTrek) => {
        try {
            const response = await axios.get("http://localhost:4000/api/trek");
            const allTreks = response.data;
            const recommended = allTreks
                .filter(
                    (trek) =>
                        trek.destination?.name === currentTrek.destination?.name &&
                        trek.difficulty === currentTrek.difficulty &&
                        trek._id !== currentTrek._id
                )
                .slice(0, 4);
            setRecommendedTreks(recommended);
        } catch (error) {
            console.error("Error fetching recommended treks:", error);
            setErrorMessage("Error fetching recommended treks. Please try again later.");
        }
    };

    if (errorMessage) {
        return (
            <div className="container mx-auto max-w-4xl p-4">
                <p className="text-red-600 font-bold">{errorMessage}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mt-4"
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (!trek) {
        return (
            <div className="container mx-auto max-w-4xl p-4">
                <p className="text-gray-600">Loading trek details...</p>
            </div>
        );
    }

    return (
        <div className="container mx-10 mt-6" style={{ margin: "5%" }}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0 w-full lg:w-1/2">
                        {trek.profileImage?.map((image, idx) => (
                            <img
                                key={idx}
                                src={`/uploads/${image}`}
                                alt={trek.name}
                                className="object-cover rounded-lg w-full h-80 mb-4"
                            />
                        ))}
                    </div>

                    <div className="flex-grow w-full lg:w-2/3">
                        <h2 className="text-3xl font-bold text-red-600 mb-4">{trek.name}</h2>

                        <div className="mb-4">
                            <span className="text-xl font-bold text-blue-600 mb-2">Destination: </span>
                            <span className="text-gray-600">{trek.destination?.name || "Unknown"}</span>
                        </div>

                        <div className="mb-4">
                            <span className="text-green-800 font-bold">Difficulty: </span>
                            <span className="text-black font-bold">{trek.difficulty}</span>
                        </div>

                        <div className="mb-4">
                            <span className="text-xl font-bold text-blue-600 mb-2">Duration: </span>
                            <span className="text-gray-600">{`${trek.duration.days} Days, ${trek.duration.nights} Nights`}</span>
                        </div>

                        <div className="mb-4">
                            <span className="text-green-800 font-bold">Max Altitude: </span>
                            <span className="text-black font-bold">{trek.maxAltitude ? `${trek.maxAltitude} meters` : "Not specified"}</span>
                        </div>

                        <span className="mb-4">
                            <span className="text-xl font-bold text-blue-600 mb-2">Best Seasons:</span>
                            <span className="flex items-center space-x-4 my-3">
                                {trek.bestSeasons?.map((season, idx) => (
                                    <span
                                        key={idx}
                                        className="text-gray-600 text-xs font-bold bg-green-200 px-2 py-1 rounded-md"
                                    >
                                        {season}
                                    </span>
                                ))}
                            </span>
                        </span>

                        <div className="mb-4">
                            <span className="text-green-800 font-bold">Guide Required: </span>
                            <span className="text-black font-bold">{trek.guideRequired ? "Yes" : "No"}</span>
                        </div>

                        <div className="mb-4">
                            <span className="text-xl font-bold text-red-600 mb-2">Cost Per Person: </span>
                            <span className="text-gray-800 font-bold">{`NPR ${trek.costPerPerson}`}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold text-red-600 mb-2">Description</h3>
                    <p className="text-gray-600">{trek.description}</p>
                </div>
            </div>


            <div className="mt-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Recommended Treks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendedTreks.length > 0 ? (
                        recommendedTreks.map((recommendedTrek) => (
                            <div
                                key={recommendedTrek._id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                            >
                                <img
                                    src={`/uploads/${recommendedTrek.profileImage[0]}`}
                                    alt={recommendedTrek.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-3">
                                    <h4 className="text-xl font-bold text-gray-800">{recommendedTrek.name}</h4>
                                    <p className="text-gray-600">{recommendedTrek.destination?.name}</p>
                                    <button
                                        onClick={() => navigate(`/trek/${recommendedTrek._id}`)}
                                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        View Details
                                    </button>
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

export default TrekDetails;
