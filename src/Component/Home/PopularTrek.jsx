import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PopularTrek = () => {
    const [Treks, setTreks] = useState([]);

    useEffect(() => {
        fetch('/Json/Trek.json')
            .then(response => response.json())
            .then(data => setTreks(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
                                    src={trek.image}
                                    alt={trek.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <h3 className="text-lg font-semibold mt-2 text-black text-center">
                                    {trek.name}
                                </h3>
                                <p className="text-gray-700 text-center">
                                    {trek.location}
                                    </p>
                                <p className="text-gray-700 text-center"> 
                                    <p className="text-black font-bold">Distance from Kathmandu: </p>{trek.distance_from_kathmandu}

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
