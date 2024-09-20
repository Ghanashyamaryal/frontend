import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa'; 
import './login.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

function Register() {
    const navigate = useNavigate(); 
    return (
        <div className="flex items-center justify-center min-h-screen gradient-bg">
            <div className="flex flex-col md:flex-row bg-transparent rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
                
                <div className="p-8 md:w-1/2 left-section">
                    <h2 className="text-3xl font-semibold mb-6 text-white text-center">Register</h2>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        navigate('/login'); }}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm mb-2 text-white">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name = "name"
                                    className="w-full p-2 pl-10 border border-gray-300 rounded bg-white text-black"
                                    placeholder="Enter your email"
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
                                    name = "password"
                                    className="w-full p-2 pl-10 border border-gray-300 rounded bg-white text-black"
                                    placeholder="Enter your password"
                                />
                                <span className="absolute inset-y-0 left-1 flex items-center pl-2">
                                    <FaLock className="text-gray-700" />
                                </span>
                            </div>
                        </div>
                            <button
                                type="submit"
                                className=" w-full"
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
