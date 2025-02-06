import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PackageDetails = () => {
    const { packageId } = useParams();
    const navigate = useNavigate();
    const [packageData, setPackageData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchPackageDetails();
    }, []);

    const fetchPackageDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/package/${packageId}`);
            setPackageData(response.data);
        } catch (error) {
            console.error("Error fetching package details:", error);
            setErrorMessage("Error fetching package details. Please try again later.");
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

    if (!packageData) {
        return (
            <div className="container mx-auto max-w-4xl p-4">
                <p className="text-gray-600">Loading package details...</p>
            </div>
        );
    }

    return (
        <div className="container mx-10 mt-6" style={{ margin: "5%" }}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0 w-full lg:w-1/2">
                        <img
                            src={`/uploads/${packageData.profileImage}`}
                            alt={packageData.title}
                            className="object-cover rounded-lg w-full h-80"
                        />
                    </div>

                    <div className="flex-grow w-full lg:w-2/3">
                        <h2 className="text-3xl font-bold text-red-600 mb-4">{packageData.title}</h2>

                        <div className="mb-4">
                            <span className="text-green-800 font-bold">Destination: </span>
                            <span className="text-gray-600">{packageData.destination}</span>
                        </div>

                        <div className="mb-4">
                            <span className="text-green-800 font-bold">Duration: </span>
                            <span className="text-gray-600">{packageData.duration.days} Days / {packageData.duration.nights} Nights</span>
                        </div>

                        <div className="mb-4">
                            <span className="text-xl font-bold text-blue-600 mb-2">Price Range: </span>
                            <span className="text-gray-800 font-bold">
                                NPR {packageData.price - packageData.discount}
                                {packageData.discount > 0 && (
                                    <span className="text-red-600 line-through ml-2">
                                        {`NPR ${packageData.price}`}
                                    </span>
                                )}
                            </span>
                        </div>

                        <div className="mb-4">
                            <span className="text-green-800 font-bold">Inclusions: </span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {packageData.inclusions.map((inclusion, idx) => (
                                    <span
                                        key={idx}
                                        className="text-gray-600 text-xs bg-green-200 px-2 py-1 rounded-md"
                                    >
                                        {inclusion}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <span className="text-red-800 font-bold">Exclusions: </span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {packageData.exclusions.map((exclusion, idx) => (
                                    <span
                                        key={idx}
                                        className="text-gray-600 text-xs bg-gray-200 px-2 py-1 rounded-md"
                                    >
                                        {exclusion}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mt-6"
                        >
                            Book Now
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold text-red-600 mb-2">Description</h3>
                    <p className="text-gray-600">{packageData.description}</p>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
