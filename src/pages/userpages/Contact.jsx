import React from 'react';
import { FaUser, FaPhone, FaEnvelope, FaComment } from 'react-icons/fa'; // Import icons

const Contact = () => {
  console.log(import.meta.env.VITE_BACKEND_URL)
  return (
    <div className="container mx-auto px-6 py-12">

      <h2 className="text-3xl font-bold text-center text-black mb-2">Get in touch</h2>
      <div className="max-w-4xl mx-auto border border-violet-500 bg-slate-100 shadow-md rounded-lg p-8">
        <form className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-800" />
              <input
                className="pl-10 pr-4 py-2 w-full border text-black border-violet-950 rounded-lg  focus:outline-none focus:ring-2 text-black focus:ring-yellow-500"
                type="text"
                placeholder="Your name"
              />
            </div>


            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-800" />
              <input
                className="pl-10 pr-4 py-2 w-full text-black border border-violet-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                type="text"
                placeholder="Your phone number"
              />
            </div>


            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-800" />
              <input
                className="pl-10 pr-4 py-2  text-black w-full border border-violet-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                type="email"
                placeholder="Your email"
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="relative border rounded-lg border-violet-950">
            <FaComment className="absolute left-3  top-3 text-gray-800" />
            <textarea
              className="pl-10 pr-4 py-2 text-black w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="8"
              placeholder="Your message"
            ></textarea>
          </div>


          <div className="text-right">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-colors duration-300"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Office Information */}
      <div className="text-center text-gray-500 mt-8">
        <p>Sfg Travel , Kathmandu Nepal</p>
      </div>
    </div>
  );
};

export default Contact;
