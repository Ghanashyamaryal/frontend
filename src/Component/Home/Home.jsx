import React from 'react';
import './Home.css';
import PopularDestination from './PopularDestination';
import PopularTrek from './PopularTrek';
import RecommendedHotels from './RecommendedHotels';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
          
            <div className="background">
                <div className="overlay"></div>
                <div className="content">
                    <h1 className="heading">
                        Embrace the Majesty of Nepal
                    </h1>
                    <p className="paragraph">
                        Discover the majestic peaks of the Himalayas and visit the sacred birthplace of Buddha.
                    </p>
                    <button className="button" onClick={() => navigate("/destinations")}>
                        Start Your Journey
                    </button>
                </div>
            </div>

           
            <PopularDestination />
            <PopularTrek />
            <RecommendedHotels />
        </div>
    );
};

export default Home;
