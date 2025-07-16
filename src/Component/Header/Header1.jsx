import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from "../../store/Slice";
import Search from "../../pages/userpages/Search";
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";

const Header1 = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const [token, setToken] = useState("")
    const [username, setusername] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        const data = localStorage.getItem("token")
        const userdata = localStorage.getItem("username")
        setToken(data)
        setusername(userdata)
    })

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLoginLogout = () => {
        if (token) {
            dispatch(logout());
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    return (
        <header className="bg-blue-950 shadow-md py-4 px-6">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="text-2xl font-bold text-white">
                    <Link to="/">Yatra Sathi</Link>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    >
                        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/hotels" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition duration-200">Hotels</Link>
                    {/* <Link to="/trek" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition duration-200">Trek</Link> */}
                    <Link to="/destinations" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition duration-200">Destinations</Link>
                    <Link to="/planyourtrip" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition duration-200">Plan Your Trip</Link>
                    <Link to="/nearbyattraction" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition duration-200">Nearby Attraction</Link>
                    <Link to="/packages" className="text-white font-semibold hover:bg-gray-300 rounded-3xl px-3 py-2 transition duration-200">Packages</Link>
                </nav>

                <div className="hidden md:flex space-x-4 items-center">
                    <div className="relative">
                        <Search />
                    </div>

                    {token ? (
                        <div className="flex items-center auth-links text-white">
                            <div className='flex items-center flex-col'>
                                <FaRegUser className='h-7 w-7' />
                                <span className="uppercase">
                                    {username.split(" ")[0].length > 10 ? `${username.split(" ")[0].slice(0, 10) }...` : username.split(" ")[0]}
                                </span>

                            </div>
                            <button className="ml-4" onClick={handleLoginLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className="auth-links text-white">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )}
                </div>
            </div>

            <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} mt-4`}>
                <nav className="flex flex-col items-center space-y-4">
                    <Link to="/hotels" className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition duration-200">Hotels</Link>
                    {/* <Link to="/trek" className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition duration-200">Trek</Link> */}
                    <Link to="/destinations" className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition duration-200">Destinations</Link>
                    <Link to="/planyourtrip" className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition duration-200">Plan Your Trip</Link>
                    <Link to="/nearbyattraction" className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition duration-200">Nearby Attraction</Link>
                    <Link to="/packages" className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition duration-200">Packages</Link>

                    {token ? (
                        <button
                            onClick={handleLoginLogout}
                            className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition duration-200"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition duration-200">
                                Login
                            </Link>
                            <Link to="/register" className="text-white hover:bg-gray-800 rounded-md px-3 py-2 transition duration-200">
                                Register
                            </Link>
                        </>
                    )}
                </nav>

                <div className="relative w-full mt-4 px-4">
                    <input
                        type="text"
                        placeholder="Search for Hotels, Destinations, Trek"
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>
        </header>
    );
};

export default Header1;
