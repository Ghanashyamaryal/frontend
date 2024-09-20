import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Search from '../../pages/Search';

const Header1 = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-blue-950 shadow-md py-4 px-6">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="text-2xl font-bold text-white">
                    <Link to="/">SFG</Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setMenuOpen(!menuOpen)} 
                        className="text-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    >
                        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>

                {/* Desktop Navigation Links with Background Change and Rounded Corners on Hover */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/hotels" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition-colors duration-200">Hotels</Link>
                    <Link to="/trek" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition-colors duration-200">Trek</Link>
                    <Link to="/destinations" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition-colors duration-200">Destinations</Link>
                    <Link to="/planyourtrip" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition-colors duration-200">Plan Your Trip</Link>
                    <Link to="/nearbyattraction" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition-colors duration-200">Nearby Attraction</Link>
                    <Link to="/packages" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition-colors duration-200">Packages</Link>
                </nav>

                
                <div className="hidden md:block relative w-64">
                    <Search />
                </div>

                
                <div className="hidden md:flex space-x-4">
                    <Link to="/login" className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition-colors duration-200">Login</Link>
                    <Link to="/register" className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition-colors duration-200">Register</Link>
                </div>
            </div>

          
            <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} mt-4`}>
                <nav className="flex flex-col items-center space-y-4">
                    <Link to="/hotels" className="text-white hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">Hotels</Link>
                    <Link to="/destinations" className="text-white hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">Destinations</Link>
                    <Link to="/trek" className="text-white hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">Trek</Link>
                    <Link to="/planyourtrip" className="text-white hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">Plan Your Trip</Link>
                    <Link to="/nearbyattraction" className="text-white hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">Nearby Attraction</Link>
                    <Link to="/packages" className="text-white hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">Packages</Link>
                    <Link to="/login" className="text-white hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">Login</Link>
                    <Link to="/register" className="text-white hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">Register</Link>
                </nav>

               
                <div className="relative w-full mt-4 px-4">
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Search for Hotels, Destinations, Trek"
                    />
                    <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </header>
    );
}

export default Header1;
