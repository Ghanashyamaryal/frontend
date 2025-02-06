import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../../store/Slice"
import axios from 'axios';
import './login.css';

function Login() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:4000/api/auth/login", formData);
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            dispatch(login()); 

            setError("");
            navigate(data.role === "admin" ? "/admin" : "/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen gradient-bg">
            <div className="flex flex-col md:flex-row bg-transparent rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
                <div className="p-8 md:w-1/2 left-section">
                    <h2 className="text-3xl font-semibold mb-6 text-white text-center">Log In</h2>
                    {error && (
                        <div className="text-red-500 text-sm mb-4">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
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
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <FaEnvelope className="text-gray-600" />
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
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <FaLock className="text-gray-600" />
                                </span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white font-semibold py-2 px-4 rounded hover:bg-blue-900 transition duration-200"
                        >
                            Log In
                        </button>
                    </form>
                    <Link to="/register">
                        <p className="mt-4 text-sm text-white text-center">
                            Don't have an account? Register
                        </p>
                    </Link>
                </div>
                <div className="hidden md:block md:w-1/2">
                    <img src="/Images/background3.jpg" alt="Decorative" className="object-cover w-full h-full rounded-r-lg" />
                </div>
            </div>
        </div>
    );
}

export default Login;
