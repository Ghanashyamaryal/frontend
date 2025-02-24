import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from "../../store/Slice";
import './Header.css';
import Search from "../../pages/userpages/Search";

const Header = () => {
    const [token, setToken] = useState("")
    const [username, setusername] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const data = localStorage.getItem("token")
        const userdata = localStorage.getItem("username")
        setToken(data)
        setusername(userdata)
    })

    const [menuOpen, setMenuOpen] = useState(false);

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
        <header className="header bg-blue-950">
            <div className="top-row">
                <div className="logo text-white">
                    <Link to="/">Yatra Sathi</Link>
                </div>

                <Search />

                <span className="phone-container text-white">
                    <FaPhoneAlt /> +977-9856412515
                </span>

                <div className='mx-11'>
                    <Link to="/contact">Contact Us</Link>
                </div>

                {token ? (
                    <div className="flex items-center auth-links text-white">
                        <div className='flex items-center flex-col'>
                            <FaRegUser className='h-7 w-7' />
                            <span className="uppercase">
                                {username.split(" ")[0].length > 10 ? `${username.split(" ")[0].slice(0, 10)}...` : username.split(" ")[0]}
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

                <div className="menu-toggle" onClick={toggleMenu}>
                    ☰
                </div>
            </div>

            <div className={`bottom-row ${menuOpen ? 'open' : ''}`}>
                <Link to="/hotels" onClick={() => setMenuOpen(false)}>Hotels</Link>
                <Link to="/destinations" onClick={() => setMenuOpen(false)}>Destinations</Link>
                <Link to="/trek" onClick={() => setMenuOpen(false)}>Trek</Link>
                <Link to="/festivalandevents" onClick={() => setMenuOpen(false)}>Festival & Events</Link>
                <Link to="/planyourtrip" onClick={() => setMenuOpen(false)}>Plan Your Trip</Link>
                <Link to="/nearbyattraction" onClick={() => setMenuOpen(false)}>Nearby Attraction</Link>
                <Link to="/packages" onClick={() => setMenuOpen(false)}>Packages</Link>
            </div>
        </header>
    );
};

export default Header;
