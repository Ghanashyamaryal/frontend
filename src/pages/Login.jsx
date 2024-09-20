import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

import './login.css';
import { Link } from 'react-router-dom';
function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen gradient-bg">
            <div className="flex flex-col md:flex-row bg-transparent rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
                <div className="p-8 md:w-1/2 left-section">
                    <h2 className="text-3xl font-semibold mb-6 text-white text-center">Log In</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm mb-2 text-white">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-2 pl-10 border border-gray-300 rounded bg-white text-black"
                                    placeholder="Enter your email"
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
                                    className="w-full p-2 pl-10 border border-gray-300 rounded bg-white text-black"
                                    placeholder="Enter your password"
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <FaLock className="text-gray-600" />
                                </span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className=' w-full'
                        >
                            Log In
                        </button>


                    </form>
                    <Link to="/register"><p className="mt-4 text-sm text-white text-center">Don't have an account?</p></Link>
                </div>

                <div className="hidden md:block md:w-1/2">
                    <img src="/Images/background3.jpg" alt="Decorative" className="object-cover w-full h-full rounded-r-lg" />
                </div>
            </div>
        </div>
    );
}

export default Login;
