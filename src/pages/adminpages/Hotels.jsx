import React, { useState, useEffect } from "react";
import axios from "axios";


const HotelAdmin = () => {
  const [hotels, setHotels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    profileImage: null,
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    phone: "",
    starRating: "",
    website: "",
    priceRange: { min: 0, max: 0 },
    rating: 0,
  });
  const [editingHotelId, setEditingHotelId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/api/hotel");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setErrorMessage("Error fetching hotels.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file && !allowedTypes.includes(file.type)) {
        setErrorMessage("Only JPG and PNG images are allowed.");
        return;
      }
      if (file && file.size > maxSize) {
        setErrorMessage("Image size should be less than 5MB.");
        return;
      }

      setFormData((prev) => ({ ...prev, profileImage: file }));
    } else if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else if (name.includes("priceRange.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        priceRange: { ...prev.priceRange, [field]: Number(value) || 0 },
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
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("starRating", formData.starRating);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("rating", formData.rating);

    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }

    Object.keys(formData.address).forEach((key) => {
      formDataToSend.append(`address[${key}]`, formData.address[key]);
    });

    Object.keys(formData.priceRange).forEach((key) => {
      formDataToSend.append(`priceRange[${key}]`, formData.priceRange[key]);
    });

    try {
      if (editingHotelId) {
        await axios.put(
          `http://localhost:4000/api/hotel/${editingHotelId}`,
          formDataToSend
        );
        setSuccessMessage("Hotel updated successfully.");
      } else {
        await axios.post("http://localhost:4000/api/hotel", formDataToSend);
        setSuccessMessage("Hotel added successfully.");
      }
      fetchHotels();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (hotel) => {
    setEditingHotelId(hotel._id);
    setFormData({
      name: hotel.name || "",
      description: hotel.description || "",
      profileImage: null, 
      address: {
        street: hotel.address?.street || "",
        city: hotel.address?.city || "",
        state: hotel.address?.state || "",
        country: hotel.address?.country || "",
        zipCode: hotel.address?.zipCode || "",
      },
      phone: hotel.phone || "",
      starRating: hotel.starRating || "",
      website: hotel.website || "",
      priceRange: {
        min: hotel.priceRange?.min || 0,
        max: hotel.priceRange?.max || 0,
      },
      rating: hotel.rating || 0,
    });
    setShowForm(true);
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await axios.delete(`http://localhost:4000/api/hotel/${id}`);
        fetchHotels();
      } catch (error) {
        console.error("Error deleting hotel:", error);
        setErrorMessage("Error deleting hotel.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      profileImage: null,
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      },
      phone: "",
      starRating: "",
      website: "",
      priceRange: { min: 0, max: 0 },
      rating: 0,
    });
    setEditingHotelId(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => setShowForm(true)}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-black px-6 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
      >
        Add New Hotel
      </button>

      {showForm && (
        <form
          action="/upload"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="p-6 border rounded-lg bg-[#ADBBDA] shadow-lg mt-6"
        >
          <h2 className="text-2xl font-semibold mb-4">
            {editingHotelId ? "Edit Hotel" : "Add Hotel"}
          </h2>

          {successMessage && (
            <div className="text-green-600 mb-4">{successMessage}</div>
          )}
          {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Hotel Name
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
                Upload Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              {formData.profileImage && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Address</legend>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="Street"
                className="w-full p-2 border rounded-lg text-black"
              />
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-2 border rounded-lg text-black"
              />
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-2 border rounded-lg text-black"
              />
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full p-2 border rounded-lg text-black"
              />
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                className="w-full p-2 border rounded-lg text-black"
              />
            </fieldset>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Star Rating
              </label>
              <input
                type="text"
                name="starRating"
                value={formData.starRating}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  name="priceRange.min"
                  value={formData.priceRange.min}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  name="priceRange.max"
                  value={formData.priceRange.max}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                step="0.1"
                max="5"
                className="w-full p-2 border rounded-lg text-black"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              {loading
                ? "Submitting..."
                : editingHotelId
                  ? "Update Hotel"
                  : "Add Hotel"}
            </button>
          </div>
        </form>
      )}
      <div className="mt-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Hotels</h2>

        {loading ? (
          <div className="text-center text-lg bg-gray-100 text-gray-700">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 bg-gray-100 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
               
                <div className="flex justify-between mb-4">
                  <button
                    onClick={() => handleEdit(hotel)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-yellow-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
                <div className="relative">
                  <img
                    src={`/uploads/${hotel.profileImage}`}
                    alt={hotel.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

              
                <div className="mt-4">
                  
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {hotel.name}
                  </h3>
                  <p className="text-sm text-gray-600">{`${hotel.address.city}, ${hotel.address.state}`}</p>

                 
                  <div className="flex items-center mt-2 text-sm">
                    <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                      {`Rating: ${hotel.rating}`}
                    </span>
                    <span className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                      {`${hotel.starRating} Star Hotel`}
                    </span>
                  </div>

                 
                  <div className="mt-2">
                    <p className="text-xl font-bold text-red-500">
                      NPR {`${hotel.priceRange.min} - ${hotel.priceRange.max}`}
                    </p>
                    <p className="text-xs text-gray-500">+ Taxes included</p>
                  </div>

                 
                  <div className="mt-2">
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-lg font-bold hover:underline"
                    >
                      Website Link
                    </a>
                    <span><button className="bg-blue-500 mx-11 ">View Detail</button></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default HotelAdmin;
