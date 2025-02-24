import React, { useState, useEffect } from "react";
import axios from "axios";

const FestivalAdmin = () => {
  const [festivals, setFestivals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    season: "",
    profileImage: null,
  });
  const [editingFestivalId, setEditingFestivalId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchFestivals();
  }, []);

  const fetchFestivals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${ import.meta.env.VITE_BACKEND_URL}/api/festival`);
      setFestivals(response.data);
    } catch (error) {
      console.error("Error fetching festivals:", error);
      setErrorMessage("Error fetching festivals.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData((prev) => ({ ...prev, profileImage: files }));
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
    formDataToSend.append("season", formData.season);

    if (formData.profileImage) {
      Array.from(formData.profileImage).forEach((image) => {
        formDataToSend.append("profileImage", image);
      });
    }

    try {
      if (editingFestivalId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/festival/${editingFestivalId}`,
          formDataToSend
        );
        setSuccessMessage("Festival updated successfully.");
      } else {
        await axios.post("http://localhost:4000/api/festival", formDataToSend);
        setSuccessMessage("Festival added successfully.");
      }
      fetchFestivals();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (festival) => {
    setEditingFestivalId(festival._id);
    setFormData({
      name: festival.name || "",
      description: festival.description || "",
      season: festival.season?.join(", ") || "",
      profileImage: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this festival?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/festival/${id}`);
        fetchFestivals();
      } catch (error) {
        console.error("Error deleting festival:", error);
        setErrorMessage("Error deleting festival.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      season: "",
      profileImage: null,
    });
    setEditingFestivalId(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => setShowForm(true)}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-black px-6 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
      >
        Add New Festival
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 border rounded-lg bg-[#ADBBDA] shadow-lg mt-6"
        >
          <h2 className="text-2xl font-semibold mb-4">
            {editingFestivalId ? "Edit Festival" : "Add Festival"}
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
                Festival Name
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
                Season (Comma Separated)
              </label>
              <input
                type="text"
                name="season"
                value={formData.season}
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
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-green-500 text-gray-800 px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
            >
              {editingFestivalId ? "Update Festival" : "Add Festival"}
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
        {festivals.map((festival) => (
          <div
            key={festival._id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <div className="flex justify-between mb-4">
              <button
                onClick={() => handleEdit(festival)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(festival._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>

            <img
              src={`/uploads/${festival.profileImage}`}
              alt={festival.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {festival.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {festival.description}
            </p>
            <p className="text-sm text-gray-500">Season: {festival.season}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FestivalAdmin;
