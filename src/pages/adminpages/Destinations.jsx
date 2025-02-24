import React, { useState, useEffect } from "react";
import axios from "axios";

const DestinationAdmin = () => {
  const [destinations, setDestinations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    location: {
      country: "",
      state: "",
      city: "",
      latitude: "",
      longitude: ""
    },
    profileImage: null,
    bestTimeToVisit: "",
    activities: "",
    rating: 0,
  });
  const [editingDestinationId, setEditingDestinationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${ import.meta.env.VITE_BACKEND_URL}/api/destination`);
      setDestinations(response.data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setErrorMessage("Error fetching destinations.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData((prev) => ({ ...prev, profileImage: files }));
    } else if (name.includes("location.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("location[country]", formData.location.country);
    formDataToSend.append("location[state]", formData.location.state);
    formDataToSend.append("location[city]", formData.location.city);
    formDataToSend.append("location[latitude]", formData.location.latitude);
    formDataToSend.append("location[longitude]", formData.location.longitude);
    formDataToSend.append("bestTimeToVisit", formData.bestTimeToVisit);
    formDataToSend.append("activities", formData.activities);
    formDataToSend.append("rating", formData.rating);

    if (formData.profileImage) {
      Array.from(formData.profileImage).forEach((image) => {
        formDataToSend.append("profileImage", image);
      });
    }

    try {
      if (editingDestinationId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/destination/${editingDestinationId}`,
          formDataToSend
        );
        setSuccessMessage("Destination updated successfully.");
      } else {
        await axios.post(`${ import.meta.env.VITE_BACKEND_URL}/api/destination`, formDataToSend);
        setSuccessMessage("Destination added successfully.");
      }
      fetchDestinations();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (destination) => {
    setEditingDestinationId(destination._id);
    setFormData({
      name: destination.name || "",
      description: destination.description || "",
      type: destination.type || "",
      location: {
        country: destination.location?.country || "",
        state: destination.location?.state || "",
        city: destination.location?.city || "",
        latitude:destination.location?.latitude||"",
        longitude:destination.location?.longitude||""
      },
      profileImage: null,
      bestTimeToVisit: destination.bestTimeToVisit?.join(", ") || "",
      activities: destination.activities?.join(", ") || "",
      rating: destination.rating || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/destination/${id}`);
        fetchDestinations();
      } catch (error) {
        console.error("Error deleting destination:", error);
        setErrorMessage("Error deleting destination.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "",
      location: {
        country: "",
        state: "",
        city: "",
        latitude:"",
        longitude:""
      },
      profileImage: null,
      bestTimeToVisit: "",
      activities: "",
      rating: 0,
    });
    setEditingDestinationId(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => setShowForm(true)}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-black px-6 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
      >
        Add New Destination
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 border rounded-lg bg-[#ADBBDA] shadow-lg mt-6"
        >
          <h2 className="text-2xl font-semibold mb-4">
            {editingDestinationId ? "Edit Destination" : "Add Destination"}
          </h2>

          {successMessage && (
            <div className="text-green-600 mb-4">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-600 mb-4">{errorMessage}</div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Destination Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Type
              </label>
              <textarea
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
                required
              ></textarea>
            </div>

            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Location</legend>
              <input
                type="text"
                name="location.country"
                value={formData.location.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full p-2 border rounded-lg text-black"
                required
              />
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-2 border rounded-lg text-black"
                required
              />
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-2 border rounded-lg text-black"
                required
              />
              <input type="text" 
              name="location.latitude" 
              value={formData.location.latitude} 
              onChange={handleChange} 
              placeholder="Latitude" 
              className="w-full p-2 border rounded-lg mb-2 text-black" 
              required />

              <input type="text" 
              name="location.longitude" 
              value={formData.location.longitude}
               onChange={handleChange} placeholder="Longitude" 
               className="w-full p-2 border rounded-lg mb-2 text-black"
                required />

            </fieldset>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Best Time to Visit (Comma Separated)
              </label>
              <input
                type="text"
                name="bestTimeToVisit"
                value={formData.bestTimeToVisit}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Activities (Comma Separated)
              </label>
              <input
                type="text"
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Images
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                multiple
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-black text-sm font-bold mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                step="0.1"
                max="5"
                className="w-full p-2 text-black border rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-green-500 text-gray-800 px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
            >
              {editingDestinationId ? "Update Destination" : "Add Destination"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-red-500 text-black px-6 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {destinations.map((destination) => (
          <div
            key={destination._id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <div className="flex justify-between mb-4">
              <button
                onClick={() => handleEdit(destination)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(destination._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>

            <img
              src={`/uploads/${destination.profileImage}`}
              alt={destination.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {destination.name}
            </h3>
            <p className="text-sm text-gray-500">
              {destination.location.city}, {destination.location.country}
            </p>
            <p className="text-sm text-gray-500">Rating: {destination.rating}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DestinationAdmin;
