import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Hotels = ({data}) => {
    const navigate = useNavigate();
    const [hotel, setHotels] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); 
    const itemsPerPage = 7;  

    const amenities = ["Free_Wifi", "Geyser", "Card_payment", "CCTV", "Dining_area"];

    useEffect(() => {
        fetchHotels();
    }, [searchQuery]);
    
    useEffect(() => {
        fetchHotels();
    }, []);
    useEffect(() => {
        fetchHotels();
    }, [data]);


    const fetchHotels = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/hotel?search=${searchQuery}`);
            setHotels(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    const handleSort = (e) => {
        const sortValue = e.target.value;
        setSortOption(sortValue);
        let sortedHotels = [...hotel];

        if (sortValue === "low-to-high") {
            sortedHotels.sort((a, b) => a.priceRange.min - b.priceRange.min);
        } else if (sortValue === "high-to-low") {
            sortedHotels.sort((a, b) => b.priceRange.min - a.priceRange.min);
        } else if (sortValue === "best-rating") {
            sortedHotels.sort((a, b) => b.rating - a.rating);
        }

        setHotels(sortedHotels);
    };

   
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHotels = hotel.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(hotel.length / itemsPerPage);

    return (
        <div className="container mx-auto max-w-4xl p-4">
            <div className="mb-4">
                <select
                    value={sortOption}
                    onChange={handleSort}
                    className="p-2 border border-purple-950 text-black font-bold rounded-md"
                >
                    <option value="">Sort by</option>
                    <option value="high-to-low">High Price to Low</option>
                    <option value="low-to-high">Low Price to High</option>
                    <option value="best-rating">Best Rating</option>
                </select>
            </div>
            <div className="grid grid-cols-1 gap-6"  >
                {currentHotels.map((hotel, index) => (
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
                                {/* <span className="text-gray-600 text-sm">({hotel.reviews} Ratings) - {hotel.status || "Good"}</span> */}
                                <span className="text-green-600 font-bold text-sm mr-2">{`  - ${hotel.starRating} Star Hotel`}</span>
                            </div>
                            <div className="text-gray-500 text-sm mb-2">
                                {` ${hotel.address.street} ${hotel.address.country} `}
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
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-red-800">NPR : {`${hotel.priceRange.min}-${hotel.priceRange.max}`}</span>
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

          
            <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1
                            ? "bg-purple-600 text-white"
                            : "bg-gray-300 text-gray-800"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Hotels;
