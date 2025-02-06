import React, { useState, useEffect } from "react";
import axios from "axios";

const PackageAdmin = () => {
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    profileImage: null,
    destination: "",
    duration: {
      days: 0,
      nights: 0,
    },
    price: 0,
    discount: 0,
    inclusions: "",
    exclusions: "",
    rating: 0,
  });
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/api/package");
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setErrorMessage("Error fetching packages.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData((prev) => ({ ...prev, profileImage: files }));
    } else if (name.includes("duration.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        duration: { ...prev.duration, [field]: value },
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
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("destination", formData.destination);
    formDataToSend.append("duration[days]", formData.duration.days);
    formDataToSend.append("duration[nights]", formData.duration.nights);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("discount", formData.discount);
    formDataToSend.append("inclusions", formData.inclusions);
    formDataToSend.append("exclusions", formData.exclusions);
    formDataToSend.append("rating", formData.rating);

    if (formData.profileImage) {
      Array.from(formData.profileImage).forEach((image) => {
        formDataToSend.append("profileImage", image);
      });
    }

    try {
      if (editingPackageId) {
        await axios.put(
          `http://localhost:4000/api/package/${editingPackageId}`,
          formDataToSend
        );
        setSuccessMessage("Package updated successfully.");
      } else {
        await axios.post("http://localhost:4000/api/package", formDataToSend);
        setSuccessMessage("Package added successfully.");
      }
      fetchPackages();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg) => {
    setEditingPackageId(pkg._id);
    setFormData({
      title: pkg.title || "",
      description: pkg.description || "",
      profileImage: null,
      destination: pkg.destination || "",
      duration: {
        days: pkg.duration?.days || 0,
        nights: pkg.duration?.nights || 0,
      },
      price: pkg.price || 0,
      discount: pkg.discount || 0,
      inclusions: pkg.inclusions?.join(", ") || "",
      exclusions: pkg.exclusions?.join(", ") || "",
      rating: pkg.rating || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await axios.delete(`http://localhost:4000/api/package/${id}`);
        fetchPackages();
      } catch (error) {
        console.error("Error deleting package:", error);
        setErrorMessage("Error deleting package.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      profileImage: null,
      destination: "",
      duration: { days: 0, nights: 0 },
      price: 0,
      discount: 0,
      inclusions: "",
      exclusions: "",
      rating: 0,
    });
    setEditingPackageId(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => setShowForm(true)}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-black px-6 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
      >
        Add New Package
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 border rounded-lg bg-[#ADBBDA] shadow-lg mt-6"
        >
          <h2 className="text-2xl font-semibold mb-4">
            {editingPackageId ? "Edit Package" : "Add Package"}
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
                Package Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
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
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
                required
              />
            </div>

            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-1">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  name="duration.days"
                  value={formData.duration.days}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">
                  Duration (Nights)
                </label>
                <input
                  type="number"
                  name="duration.nights"
                  value={formData.duration.nights}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Inclusions (Comma Separated)
              </label>
              <input
                type="text"
                name="inclusions"
                value={formData.inclusions}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Exclusions (Comma Separated)
              </label>
              <input
                type="text"
                name="exclusions"
                value={formData.exclusions}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Package Images
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
              {editingPackageId ? "Update Package" : "Add Package"}
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
        {packages.map((pkg) => (
          <div key={pkg._id} className="p-4 border rounded-lg shadow-md bg-white">
            <div className="flex justify-between mb-4">
              <button
                onClick={() => handleEdit(pkg)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pkg._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>

            <img
              src={`/uploads/${pkg.profileImage[0]}`}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {pkg.title}
            </h3>
            {/* <p className="text-sm text-gray-600 mb-2">{pkg.description}</p> */}
            <p className="text-sm text-gray-500">
              {pkg.destination} - {pkg.duration.days} Days / {pkg.duration.nights} Nights
            </p>
            <p className="text-sm text-gray-500">Rating: {pkg.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageAdmin;
