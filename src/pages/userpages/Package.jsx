import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Packages = ({ data }) => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchPackages();
  }, []);
  useEffect(() => {
    fetchPackages();
  }, [data]);
  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/package`);
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const partition = (array, low, high, compareFn) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (compareFn(array[j], pivot)) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
  };

  const quickSort = (array, low, high, compareFn) => {
    if (low < high) {
      const pi = partition(array, low, high, compareFn);
      quickSort(array, low, pi - 1, compareFn);
      quickSort(array, pi + 1, high, compareFn);
    }
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);
    let sortedPackages = [...packages];

    if (sortValue === "low-to-high") {
      quickSort(sortedPackages, 0, sortedPackages.length - 1, (a, b) => a.price < b.price);
    } else if (sortValue === "high-to-low") {
      quickSort(sortedPackages, 0, sortedPackages.length - 1, (a, b) => a.price > b.price);
    } else if (sortValue === "best-rating") {
      quickSort(sortedPackages, 0, sortedPackages.length - 1, (a, b) => a.rating > b.rating);
    }

    setPackages(sortedPackages);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPackages = packages.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(packages.length / itemsPerPage);

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

      <div className="grid grid-cols-1 gap-6">
        {currentPackages.map((pkg, index) => (
          <div
            key={index}
            className="flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-300"
            style={{ height: "calc(100% + 2%)" }}
          >
            <div className="relative w-[50%]">
              <img
                src={`/uploads/${pkg.profileImage}`}
                alt={pkg.name}
                className="w-full h-[210px] object-cover"
              />
            </div>

            <div className="w-2/3 p-4">
              <h2 className="text-xl text-gray-800 font-bold mb-1">{pkg.title}</h2>
              <div className="flex items-center mb-2">
                <span className="text-green-600 font-bold text-sm mr-2">{pkg.rating}</span>
                <span className="text-gray-600 text-sm">({pkg.reviews} Ratings) - {pkg.status || "Good"}</span>
              </div>

              <div className="text-sm mb-2">
                <span className="font-bold text-red-800">{`Destination: `}</span>
                <span className=" text-black font-bold">{pkg.destination}</span>
              </div>
              <div className="text-sm mb-2">
                <span className="font-bold text-green-600">{`Duration: `}</span>
                <span className=" text-black font-bold" >{`${pkg.duration.days} Days ${pkg.duration.nights} Nights`}</span>
              </div>


              <div className="text-sm text-black mb-2">
                {"Inclusions:"}<span className="text-gray-600 text-xs bg-gray-200 px-2 py-1 rounded-md mr-2">
                  {pkg.inclusions.join(", ")}
                </span>
                {" Exclusions : "} <span className="text-gray-600 text-xs bg-gray-200 px-2 py-1 rounded-md">
                  {pkg.exclusions.join(", ")}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-red-800">NPR : {pkg.price}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/packages/${pkg._id}`)}
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
            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-800"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Packages;
