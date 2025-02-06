import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Trek = () => {
  const [trekList, setTrekList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [treksPerPage] = useState(6);
  const [sortOption, setSortOption] = useState("difficulty");
  const navigate  = useNavigate()

  useEffect(() => {
    fetchTreks();
  }, []);

  const fetchTreks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/trek");
      setTrekList(response.data);
    } catch (error) {
      console.error("Error fetching trek:", error);
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

  const sortedTreks =
    sortOption === "difficulty"
      ? quickSort(trekList, "difficulty")
      : [...trekList].sort((a, b) => a.name.localeCompare(b.name));

  const indexOfLastTrek = currentPage * treksPerPage;
  const indexOfFirstTrek = indexOfLastTrek - treksPerPage;
  const currentTreks = sortedTreks.slice(indexOfFirstTrek, indexOfLastTrek);

  const totalPages = Math.ceil(trekList.length / treksPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="relative p-6 bg-gradient-to-r from-blue-50 to-indigo-80 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">Trekking Adventures</h1>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-3 border rounded-lg shadow-md focus:outline-none text-black font-bold focus:ring-2 focus:ring-teal-300"
        >
          <option value="difficulty" className="text-black">
            Sort by Difficulty
          </option>
          <option value="name" className="text-black">
            Sort by Name
          </option>
        </select>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentTreks.map((trek) => (
          <li
          onClick={()=>{navigate(`/trek/${trek._id}`)}}
            key={trek.name}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative">
              <img
                src={`/uploads/${trek.profileImage[0]}`}
                alt={trek.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4">
                <h2 className="text-2xl font-bold text-white">{trek.name}</h2>
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-2xl font-bold text-black py-1">
                Difficulty: {trek.difficulty}
              </h4>
              <p className="text-gray-600 mb-4">
              Duration: <span className=" bg-gray-200 font-bold"> {trek.duration.days} days, {trek.duration.nights} nights</span> 
              </p>

              <div className="flex items-center mb-2">
                <span className="text-red-600 font-bold text-lg mr-2">Cost Per Person :</span>
                <span className="text-gray-800 text-lg" >
                   {`$ ${trek.costPerPerson}`}
                </span>
              </div>

              <p className="text-gray-600 mb-4">
                Best Seasons:{" "}
                <span className="text-gray-800 text-xs bg-gray-200 px-2 py-1 text-md rounded-md">
                  {trek.bestSeasons?.length
                    ? trek.bestSeasons.join(", ")
                    : "Not Available"}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`p-3 w-10 h-10 flex items-center justify-center rounded-lg shadow-md font-bold ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-teal-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Trek;
