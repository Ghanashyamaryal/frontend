import React, { useEffect, useState } from 'react';
import './Home.css';
import PopularDestination from './PopularDestination';
import PopularTrek from './PopularTrek';
import RecommendedHotels from './RecommendedHotels';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

 if (loading) {
  return (
    <div className="flex items-center justify-center p-5 bg-gray-100">
      <div className="bg-gray-300 animate-pulse rounded-lg" style={{ height: "500px", width: "90%" }}></div>
    </div>
  );
}


  return (
    <div className="home-container">
      <div className="background">
        <div className="overlay"></div>
        <div className="content">
          <h1 className="heading">Embrace the Majesty of Nepal</h1>
          <p className="paragraph">
            Discover the majestic peaks of the Himalayas and visit the sacred
            birthplace of Buddha.
          </p>
          <button
            className="button"
            onClick={() => navigate('/destinations')}
          >
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
