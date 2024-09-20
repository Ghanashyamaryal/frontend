import React, { useEffect, useState } from 'react';

const Destination = () => {
    const [destinationList, setDestinationList] = useState([]);

    useEffect(() => {
        fetch("/Json/Destination.json")
            .then(data => data.json())
            .then(destination => setDestinationList(destination))
            .catch(err => console.log("Error occurred at destination section"));
    }, []);

    return (
        <div className="relative p-4 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinationList.map((destination) => (
                    <li 
                        key={destination.name} 
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-white to-gray-100"
                    >
                        <div className="relative">
                            <img 
                                src={destination.image} 
                                alt={destination.name} 
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-2xl font-bold text-gray-800">{destination.name}</h2>
                            <p className="text-gray-600">{destination.location}</p>
                            <p className="text-gray-500">{destination.distance_from_kathmandu}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Destination;
