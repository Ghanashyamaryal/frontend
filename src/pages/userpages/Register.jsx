import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [formData, setformData] = useState({ username: "", email: "", password: "" });
    const [error, Seterror] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const API_URL = "http://localhost:4000";
        try {
            const response = await axios.post(`${API_URL}/api/user/register`, formData);
            console.log(response.data);

            setformData({ username: "", email: "", password: "" });
            Seterror("");
            navigate("/login");
        } catch (err) {
            Seterror(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen gradient-bg">
            <div className="flex flex-col md:flex-row bg-transparent rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
                <div className="p-8 md:w-1/2 left-section">
                    <h2 className="text-3xl font-semibold mb-6 text-white text-center">Register</h2>
                    {error && (
                        <div className="text-red-500 text-sm mb-4">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm mb-2 text-white">Username</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="w-full p-2 pl-10 border border-gray-300 rounded bg-white text-black"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <span className="absolute inset-y-0 left-1 flex items-center pl-2">
                                    <FaUser className="text-gray-700" />
                                </span>
                            </div>
                        </div>

                    
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm mb-2 text-white">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full p-2 pl-10 border border-gray-300 rounded bg-white text-black"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <span className="absolute inset-y-0 left-1 flex items-center pl-2">
                                    <FaEnvelope className="text-gray-700" />
                                </span>
                            </div>
                        </div>

                        
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm mb-2 text-white">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full p-2 pl-10 border border-gray-300 rounded bg-white text-black"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span className="absolute inset-y-0 left-1 flex items-center pl-2">
                                    <FaLock className="text-gray-700" />
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white font-semibold py-2 px-4 rounded hover:bg-blue-900 transition duration-200"
                        >
                            Register
                        </button>
                    </form>
                </div>
                <div className="hidden md:block md:w-1/2">
                    <img src="/Images/background2.jpg" alt="Decorative" className="object-cover w-full h-full rounded-r-lg" />
                </div>
            </div>
        </div>
    );
}

export default Register;
