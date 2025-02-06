import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PopularTrek = () => {
    const [Treks, setTreks] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchTreks();
      }, []);
    
      const fetchTreks = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/trek");
          setTreks(response.data);
        } catch (error) {
          console.error("Error fetching treks:", error);
        }
      };

    const scrollContainerRef = useRef(null);
    
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -800, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 800, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-8 shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500">
                Popular Treks
            </h1>

            <div className="relative">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md z-10"
                >
                    <FaChevronLeft />
                </button>
                <div
                    ref={scrollContainerRef}
                    className="overflow-hidden flex space-x-4 py-4"
                >
                    <div className="flex space-x-4">
                        {Treks.map(trek => (
                            <motion.div
                                key={trek.name}
                                className="bg-white p-4 rounded-lg shadow-md min-w-[300px] flex-shrink-0"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    src={`/uploads/${trek.profileImage}`}
                                    alt={trek.name}
                                    onClick={() => navigate(`/trek/${trek._id}`)} 
                                    className="w-full h-40 object-cover rounded-sm"
                                />
                                <h3 className="text-lg font-semibold mt-2 text-black text-center">
                                    {trek.name}
                                </h3>
                                <p className="text-gray-700 text-center font-bold">
                                    Duration {`${trek.duration.days} days ${trek.duration.nights} nights `}
                                    </p>
                              
                            </motion.div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md z-10"
                >
                    <FaChevronRight />
                </button>
            </div>
        </section>
    );
};
export default PopularTrek;
