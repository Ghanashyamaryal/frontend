import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hotels = () => {
    const navigate = useNavigate();
    const [hotel, setHotel] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        fetch("/Json/Hotels.json")
            .then((response) => response.json())
            .then((data) => setHotel(data))
            .catch(err => console.log("Error occurred at destination section: ", err));
    }, []);

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
        let sortedHotels = [...hotel];

        if (sortValue === 'low-to-high') {
            quickSort(sortedHotels, 0, sortedHotels.length - 1, (a, b) => a.price < b.price);
        } else if (sortValue === 'high-to-low') {
            quickSort(sortedHotels, 0, sortedHotels.length - 1, (a, b) => a.price > b.price);
        } else if (sortValue === 'best-rating') {
            quickSort(sortedHotels, 0, sortedHotels.length - 1, (a, b) => a.rating > b.rating);
        }

        setHotel(sortedHotels);
    };

    return (
        <div className="container mx-auto p-4">
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotel.map((hotel, index) => (
                    <div
                        key={index}
                        className="bg-slate-50 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-[350px] h-[200px] object-cover rounded-md mx-auto mt-4 cursor-pointer"
                            onClick={() => navigate(`/hotels/${hotel.hotelId}`)}
                        />

                        <div className="p-4">
                            <h2 className="text-lg text-gray-800 px-5 font-bold">{hotel.name}</h2>
                            <div className="flex items-center text-sm text-gray-900 mb-2 px-5 font-semibold">
                                <span>{hotel.rating} - Excellent</span>
                                <span className="ml-2">({hotel.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm mb-4 px-5">
                                <span>{hotel.location}</span>
                            </div>

                            {hotel.discount && (
                                <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1 inline-block mb-2">
                                    {hotel.discount}% Off
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-2 px-5">
                                <span className="font-bold text-gray-800 text-md">Stayforlong</span>
                                <span className="text-sm font-bold text-gray-600">Breakfast included</span>
                            </div>

                            <div className="flex items-center justify-between mb-4 px-5">
                                <span className="text-2xl font-bold text-gray-800">NPR:{hotel.price} per night</span>
                                <span className="text-sm text-gray-600">{hotel.date}</span>
                            </div>

                            <div className="flex items-center justify-between px-5">
                                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                                    Check deal
                                </button>
                                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hotels;
