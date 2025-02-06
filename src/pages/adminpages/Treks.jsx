import React, { useState, useEffect } from "react";
import axios from "axios";

const TrekAdmin = () => {
  const [treks, setTreks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    difficulty: "Easy",
    duration: { days: 0, nights: 0 },
    maxAltitude: "",
    description: "",
    profileImage: null,
    bestSeasons: "",
    guideRequired: true,
    costPerPerson: 0,
  });
  const [editingTrekId, setEditingTrekId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchTreks();
  }, []);

  const fetchTreks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/api/trek");
      setTreks(response.data);
    } catch (error) {
      console.error("Error fetching treks:", error);
      setErrorMessage("Error fetching treks.");
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
        duration: { ...prev.duration, [field]: Number(value) },
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
    formDataToSend.append("destination", formData.destination);
    formDataToSend.append("difficulty", formData.difficulty);
    formDataToSend.append("duration[days]", formData.duration.days);
    formDataToSend.append("duration[nights]", formData.duration.nights);
    formDataToSend.append("maxAltitude", formData.maxAltitude);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("guideRequired", formData.guideRequired);
    formDataToSend.append("costPerPerson", formData.costPerPerson);
    formData.bestSeasons.split(",").forEach((season) => {
      formDataToSend.append("bestSeasons", season.trim());
    });

    if (formData.profileImage) {
      Array.from(formData.profileImage).forEach((profileImage) => {
        formDataToSend.append("profileImage", profileImage);
      });
    }

    try {
      if (editingTrekId) {
        await axios.put(
          `http://localhost:4000/api/trek/${editingTrekId}`,
          formDataToSend
        );
        setSuccessMessage("Trek updated successfully.");
      } else {
        await axios.post("http://localhost:4000/api/trek", formDataToSend);
        setSuccessMessage("Trek added successfully.");
      }
      fetchTreks();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (trek) => {
    setEditingTrekId(trek._id);
    setFormData({
      name: trek.name || "",
      destination: trek.destination || "",
      difficulty: trek.difficulty || "Easy",
      duration: {
        days: trek.duration?.days || 0,
        nights: trek.duration?.nights || 0,
      },
      maxAltitude: trek.maxAltitude || "",
      description: trek.description || "",
      profileImage: null,
      bestSeasons: trek.bestSeasons?.join(", ") || "",
      guideRequired: trek.guideRequired || true,
      costPerPerson: trek.costPerPerson || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this trek?")) {
      try {
        await axios.delete(`http://localhost:4000/api/trek/${id}`);
        fetchTreks();
      } catch (error) {
        console.error("Error deleting trek:", error);
        setErrorMessage("Error deleting trek.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      destination: "",
      difficulty: "Easy",
      duration: { days: 0, nights: 0 },
      maxAltitude: "",
      description: "",
      profileImage: null,
      bestSeasons: "",
      guideRequired: true,
      costPerPerson: 0,
    });
    setEditingTrekId(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => setShowForm(true)}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-black px-6 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
      >
        Add New Trek
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 border rounded-lg bg-[#ADBBDA] shadow-lg mt-6"
        >
          <h2 className="text-2xl font-semibold mb-4">
            {editingTrekId ? "Edit Trek" : "Add Trek"}
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
                Trek Name
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

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
                <option value="Extreme">Extreme</option>
              </select>
            </div>

            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Duration</legend>
              <input
                type="number"
                name="duration.days"
                value={formData.duration.days}
                onChange={handleChange}
                placeholder="Days"
                className="w-full p-2 border rounded-lg text-black"
                required
              />
              <input
                type="number"
                name="duration.nights"
                value={formData.duration.nights}
                onChange={handleChange}
                placeholder="Nights"
                className="w-full p-2 border rounded-lg text-black"
                required
              />
            </fieldset>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Max Altitude (in meters)
              </label>
              <input
                type="number"
                name="maxAltitude"
                value={formData.maxAltitude}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-black"
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
                Best Seasons (Comma Separated)
              </label>
              <input
                type="text"
                name="bestSeasons"
                value={formData.bestSeasons}
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
              <label className="block text-sm font-bold text-black mb-1">
                Guide Required
              </label>
              <input
                type="checkbox"
                name="guideRequired"
                checked={formData.guideRequired}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    guideRequired: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Cost Per Person (in USD)
              </label>
              <input
                type="number"
                name="costPerPerson"
                value={formData.costPerPerson}
                onChange={handleChange}
                className="w-full p-2 text-black border rounded-lg"
                min="0"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-green-500 text-gray-800 px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
            >
              {editingTrekId ? "Update Trek" : "Add Trek"}
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
        {treks.map((trek) => (
          <div
            key={trek._id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <div className="flex justify-between mb-4">
              <button
                onClick={() => handleEdit(trek)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(trek._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>

            <img
              src={`/uploads/${trek.profileImage}`}
              alt={trek.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {trek.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{trek.description}</p>
            <p className="text-sm text-gray-500">
              Destination: {trek.destination}
            </p>
            <p className="text-sm text-gray-500">
              Difficulty: {trek.difficulty}
            </p>
            <p className="text-sm text-gray-500">
              Duration: {trek.duration.days} Days, {trek.duration.nights} Nights
            </p>
            <p className="text-sm text-gray-500">
              Cost Per Person: ${trek.costPerPerson}
            </p>
          </div>
          
        ))}
        </div>

</div>
  );
};
export default TrekAdmin