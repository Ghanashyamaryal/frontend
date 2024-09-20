import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import "./Search.css";

const Search = () => {
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="icon-container">
                    <FaSearch className="search-icon" />
                </div>
                <input
                    type="text"
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for Hotels, Destination, Trek"
                />
            </form>
        </div>
    );
}

export default Search;
