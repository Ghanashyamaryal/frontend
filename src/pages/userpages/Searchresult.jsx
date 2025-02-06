import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Hotels from "./Hotels.jsx";
import Destination from './Destination.jsx';
import Trek from './Trek.jsx';
import Packages from './Package.jsx';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';

    const [results, setResults] = useState({
        hotels: [],
        destinations: [],
        treks: [],
        packages: []
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!query) return;
            setLoading(true);

            try {
                const response = await axios.get(`http://localhost:4000/api/search?q=${query}`);
                console.log("API Response:", response.data.results);

                const removeDuplicates = (array) => {
                    const seen = new Set();
                    return array.filter(item => {
                        if (!seen.has(item._id)) {
                            seen.add(item._id);
                            return true;
                        }
                        return false;
                    });
                };

                setResults({
                    hotels: removeDuplicates(response.data.results.hotels || []),
                    destinations: removeDuplicates(response.data.results.destinations || []),
                    treks: removeDuplicates(response.data.results.treks || []),
                    packages: removeDuplicates(response.data.results.packages || []),
                });

            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    if (loading) {
        return <div className="text-center text-gray-500 py-10 text-lg font-semibold">Loading...</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-black text-center mb-8">Search Results for "{query}"</h2>
            {results.hotels.length > 0 && (
                <div className="grid grid-cols-1 gap-6">
                    {results.hotels.map((hotel, index) => (
                        <div
                            key={index}
                            className="flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-300"
                            style={{ height: "calc(100% + 2%)" }}
                        >
                            <div className="relative w-[50%]">
                                <img
                                    src={`/uploads/${hotel.profileImage}`}
                                    alt={hotel.name}
                                    onClick={() => navigate(`/hotels/${hotel._id}`)}
                                    className="w-full h-[210px] object-cover"
                                />
                            </div>

                            <div className="w-2/3 p-4">
                                <h2 className="text-xl text-gray-800 font-bold mb-1">{hotel.name}</h2>
                                <div className="flex items-center mb-2">
                                    <span className="text-green-600 font-bold text-sm mr-2">{hotel.averageRating} rating</span>
                                    <span className="text-green-600 font-bold text-sm mr-2">{` - ${hotel.starRating} Star Hotel`}</span>
                                </div>
                                <div className="text-gray-500 text-sm mb-2">
                                    {`${hotel.address?.street || "Unknown Street"}, ${hotel.address?.country || "Unknown Country"}`}
                                </div>
                               
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-red-800">NPR: {`${hotel.priceRange?.min || "N/A"} - ${hotel.priceRange?.max || "N/A"}`}</span>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => navigate(`/hotels/${hotel._id}`)}
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                        >
                                            View Details
                                        </button>
                                        <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {results.destinations.length > 0 && (
                <div className="grid grid-cols-1 gap-6">
                    {results.destinations.map((destination) => (
                        <div
                            key={destination._id}
                            className="flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-300"
                        >
                            <div className="relative w-[50%]">
                                <img
                                    src={`/uploads/${destination.profileImage}`}
                                    alt={destination.name}
                                    onClick={() => navigate(`/destinations/${destination._id}`)}
                                    className="w-full h-[210px] object-cover cursor-pointer"
                                />
                            </div>
                            <div className="w-2/3 p-4">
                                <h2 className="text-xl text-gray-800 font-bold mb-1">{destination.name}</h2>
                                
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
                    ))}
                </div>
            )}
            {results.treks.length > 0 && (
                <div className="grid grid-cols-1 gap-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800">Treks</h2>
                    {results.treks.map((trek, index) => (
                        <div
                            key={index}
                            className="flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-300"
                            style={{ height: "calc(100% + 2%)" }}
                        >
                            <div className="relative w-[50%]">
                                <img
                                    src={`/uploads/${trek.profileImage}`}
                                    alt={trek.name}
                                    onClick={() => navigate(`/treks/${trek._id}`)}
                                    className="w-full h-[210px] object-cover cursor-pointer"
                                />
                            </div>

                            <div className="w-2/3 p-4">
                                <h2 className="text-xl text-gray-800 font-bold mb-1">{trek.name}</h2>
                                <div className="text-gray-500 text-sm mb-2">
                                    {`${trek.bestSeasons || "Unknown Location"}`}
                                </div>
                                <div className="text-gray-700 text-sm mb-2">
                                    Duration: {`${trek.duration.days} days - ${trek.duration.nights} nights`} 
                                </div>
                                <div className="text-gray-500 text-sm mb-4">
                                    Difficulty: {trek.difficulty}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-red-800">NPR: {`${trek.costPerPerson|| "N/A"}`}</span>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => navigate(`/treks/${trek._id}`)}
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                        >
                                            View Details
                                        </button>
                                        <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {results.packages.length > 0 && (
                <div className="grid grid-cols-1 gap-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800">Packages</h2>
                    {results.packages.map((packageItem, index) => (
                        <div
                            key={index}
                            className="flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-300"
                            style={{ height: "calc(100% + 2%)" }}
                        >
                            <div className="relative w-[50%]">
                                <img
                                    src={`/uploads/${packageItem.profileImage}`}
                                    alt={packageItem.name}
                                    onClick={() => navigate(`/packages/${packageItem._id}`)}
                                    className="w-full h-[210px] object-cover cursor-pointer"
                                />
                            </div>

                            <div className="w-2/3 p-4">
                                <h2 className="text-xl text-gray-800 font-bold mb-1">{packageItem.title}</h2>
                                
                                <div className="text-gray-700 text-sm mb-2">
                                Duration: {`${packageItem.duration.days} days - ${packageItem.duration.nights} nights`} 
                                </div>
                                <div className="text-gray-500 text-sm mb-2">
                                Inclusions: {packageItem.inclusions?.join(", ") || "Details not available"}
                                </div>
                                <div className="text-gray-500 text-sm mb-2">
                                Exclusions: {packageItem.exclusions?.join(", ") || "Details not available"}
                                </div>
                               
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-red-800">NPR: {`${packageItem.price || "N/A"}`}</span>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => navigate(`/packages/${packageItem._id}`)}
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                        >
                                            View Details
                                        </button>
                                        <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!results.hotels.length && !results.destinations.length && !results.treks.length && !results.packages.length && (
                <div className="text-center text-gray-500 py-10 text-lg font-medium">No results found.</div>
            )}
        </div>
    );
};

export default SearchResults;
