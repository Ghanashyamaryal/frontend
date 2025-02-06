import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiUser, HiMail, HiPhone, HiLocationMarker, HiUsers, HiCalendar, HiPencil, HiCurrencyDollar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const PlanYourTrip = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    numberOfPeople: 1,
    travelDates: { startDate: "", endDate: "" },
    preferences: "",
    budget: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowPopup(true);
      setTimeout(() => navigate("/login"), 5000); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("travelDates.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        travelDates: { ...prev.travelDates, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/plantrip", formData);
      setSuccessMessage("Your trip has been planned successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        numberOfPeople: 1,
        travelDates: { startDate: "", endDate: "" },
        preferences: "",
        budget: "",
      });
    } catch (error) {
      console.error("Error planning trip:", error);
    }
  };

  const handleShare = async () => {
    try {
      const shareData = {
        ...formData,
        message: `Hey! Check out this trip plan:\n\nDestination: ${formData.destination}\nDates: ${formData.travelDates.startDate} to ${formData.travelDates.endDate}\nBudget: ${formData.budget}\nPreferences: ${formData.preferences}`,
      };
      await axios.post("http://localhost:4000/api/sharetrip", shareData);
      setSuccessMessage("Trip details shared successfully!");
    } catch (error) {
      console.error("Error sharing trip:", error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">You must be logged in to plan your trip</h2>
          <p className="text-gray-700 mb-4">Redirecting to login page in 5 seconds...</p>
          <button
            onClick={()=>{navigate("/login")}}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto p-6"
      style={{
        backgroundColor: "#8697C4",
        minHeight: "100vh",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2 className="text-4xl text-white font-bold mb-6 text-center">
        Plan Your Trip
      </h2>
      {successMessage && (
        <p className="text-green-700 font-medium mb-4 text-center">
          {successMessage}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Name</label>
          <div className="flex items-center">
            <HiUser className="text-gray-600 mr-2" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Email</label>
          <div className="flex items-center">
            <HiMail className="text-gray-600 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 text-black py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Phone</label>
          <div className="flex items-center">
            <HiPhone className="text-gray-600 mr-2" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 text-black py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Destination</label>
          <div className="flex items-center">
            <HiLocationMarker className="text-gray-600 mr-2" />
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full px-3 text-black py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Number of People</label>
          <div className="flex items-center">
            <HiUsers className="text-gray-600 mr-2" />
            <input
              type="number"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-black text-sm font-bold mb-2">Start Date</label>
            <div className="flex items-center">
              <HiCalendar className="text-gray-600 mr-2" />
              <input
                type="date"
                name="travelDates.startDate"
                value={formData.travelDates.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2">End Date</label>
            <div className="flex items-center">
              <HiCalendar className="text-gray-600 mr-2" />
              <input
                type="date"
                name="travelDates.endDate"
                value={formData.travelDates.endDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border text-black rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Preferences</label>
          <div className="flex items-center">
            <HiPencil className="text-gray-600 mr-2" />
            <textarea
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              className="w-full px-3 py-2 border text-black rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">Budget</label>
          <div className="flex items-center">
            <HiCurrencyDollar className="text-gray-600 mr-2" />
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border text-black rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-lg transform hover:scale-105 transition-transform duration-200"
        >
          Plan Trip
        </button>
      </form>

      <button
        onClick={handleShare}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-lg transform hover:scale-105 transition-transform duration-200 mt-4"
      >
        Share with Friends
      </button>
    </div>
  );
};

export default PlanYourTrip;
