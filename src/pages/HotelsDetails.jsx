import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const HotelsDetails = () => {
    const [hotel, setHotel] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetch("/Json/Hotels.json")
            .then(response => response.json())
            .then(data => setHotel(data))
            .catch(err => console.error("Error loading hotel data:", err));
    }, []);

    const { hotelId } = useParams();
    const selectedHotel = hotel.find(h => h.hotelId === parseInt(hotelId));

    if (!selectedHotel) {
        return <div className="flex justify-center items-center h-screen">Loading hotel details...</div>;
    }

    const toggleFavorite = () => setIsFavorite(!isFavorite);
    const rating = Math.round(selectedHotel.rating) || 0;
    const maxRating = 5;

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden flex lg:flex-row flex-col">
                <div className="lg:w-1/2 w-full">
                    <img
                        src={selectedHotel.image}
                        alt={selectedHotel.name}
                        className="object-cover w-full h-72 lg:h-auto"
                    />
                </div>
                <div className="lg:w-1/2 w-full p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedHotel.name}</h2>
                    <p className="text-gray-600 text-sm">{selectedHotel.address}</p>
                    <div className="mt-4 mb-2">
                        <span className="text-yellow-500 text-lg">
                            {Array(rating).fill('★').concat(Array(maxRating - rating).fill('☆')).join('')}
                        </span>
                        <span className="text-gray-600 ml-2">({selectedHotel.rating.toFixed(1)})</span>
                    </div>
                    <p className="text-gray-700 mt-2">{selectedHotel.description}</p>
                    <div className="mt-4 mb-2 flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">${selectedHotel.price} per night</span>
                        <button
                            onClick={toggleFavorite}
                            className="text-red-500 text-2xl">
                            {isFavorite ? <FaHeart /> : <FaRegHeart />}
                        </button>
                    </div>
                    <button
                        className="mt-4 bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelsDetails;
