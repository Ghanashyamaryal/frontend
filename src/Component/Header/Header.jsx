import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from "../../store/Slice";
import './Header.css';
import Search from "../../pages/userpages/Search";

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLoginLogout = () => {
        if (isLoggedIn) {
            dispatch(logout());
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

                {isLoggedIn ? (

                    <div className="auth-links text-white">
                        <button onClick={handleLoginLogout}>Logout</button>
                        {console.log(isLoggedIn)}
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
                <Link to="/hotels">Hotels</Link>
                <Link to="/destinations">Destinations</Link>
                <Link to="/trek">Trek</Link>
                <Link to="/festivalandevents">Festival & Events</Link>
                <Link to="/planyourtrip">Plan Your Trip</Link>
                <Link to="/nearbyattraction">Nearby Attraction</Link>
                <Link to="/packages">Packages</Link>
            </div>
        </header>
    );
}

export default Header;
