import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Destination = ({ data }) => {
    const navigate = useNavigate();
  const [destinationList, setDestinationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [destinationsPerPage] = useState(6);
  const [sortOption, setSortOption] = useState("rating");

  useEffect(() => {
    fetchDestinations();
  }, []);
  
  useEffect(() => {
    fetchDestinations();
  }, [data]);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/destination");
      setDestinationList(response.data);
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  const quickSort = (arr, key) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i][key] >= pivot[key]) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...quickSort(left, key), pivot, ...quickSort(right, key)];
  };

  const sortedDestinations =
    sortOption === "rating"
      ? quickSort(destinationList, "rating")
      : [...destinationList].sort((a, b) => a.name.localeCompare(b.name));

  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = sortedDestinations.slice(
    indexOfFirstDestination,
    indexOfLastDestination
  );

  const totalPages = Math.ceil(destinationList.length / destinationsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="relative p-6 bg-gradient-to-r from-blue-50 to-indigo-80 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">Destinations</h1>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-3 border rounded-lg shadow-md focus:outline-none text-black font-bold focus:ring-2 focus:ring-indigo-300"
        >
          <option value="rating" className="text-black">
            Sort by Rating
          </option>
          <option value="name" className="text-black">
            Sort by Name
          </option>
        </select>
      </div>

     <div  >
     <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"  >
        {currentDestinations.map((destination) => (
          <li
          onClick={() => navigate(`/destinations/${destination._id}`)}
            key={destination.name}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative">
              <img
                 src={`/uploads/${destination.profileImage}`}
                alt={destination.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4">
                <h2 className="text-2xl font-bold text-white">
                  {destination.name}
                </h2>
                
              </div>
            </div>
            <div className="p-3">
            <h4 className="text-2xl font-bold text-black py-1">
               Location : {` ${destination.location.city} ${destination.location.country} `}
                </h4>
               
              <p className="text-gray-600 mb-4">
                Best Time to Visit:{" "}
                <span  className="text-gray-800 text-xs bg-gray-200 px-2 py-1 text-md rounded-md">
                    {destination.bestTimeToVisit?.length
                  ? destination.bestTimeToVisit.join(", ")
                  : "Not Available"}
                </span>
                
              </p>

              <div className="flex items-center mb-2">
                <span className="text-green-600 font-bold text-sm mr-2">
                  Rating:
                </span>
                <span className="text-gray-600 text-sm">
                  ({destination.averageRating} Ratings) - {destination.status || "Good"}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      
     </div>
      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`p-3 w-10 h-10 flex items-center justify-center rounded-lg shadow-md font-bold ${
              currentPage === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 hover:bg-indigo-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Destination;
