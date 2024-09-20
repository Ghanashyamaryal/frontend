import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h5 className="font-bold text-lg mb-2">E-Travel Guide</h5>
            <p className="text-gray-400">Explore the world with confidence. Discover new places, experiences, and adventures with us.</p>
          </div>

          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h5 className="font-bold text-lg mb-2">Quick Links</h5>
            <ul>
              <li className="mb-2">
                <Link to="/hotels" className="text-gray-400 hover:text-white">Hotels</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/destinations" className="text-gray-400 hover:text-white">Top Destinations</Link>
              </li>
              <li className="mb-2">
                <Link to="/packages" className="text-gray-400 hover:text-white">Packages</Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h5 className="font-bold text-lg mb-2">Support</h5>
            <ul>
              <li className="mb-2">
                <Link to="/faqs" className="text-gray-400 hover:text-white">FAQs</Link>
              </li>
              <li className="mb-2">
                <Link to="/customerSupport" className="text-gray-400 hover:text-white">Customer Support</Link>
              </li>
              <li className="mb-2">
                <Link to="/TermsandCondition" className="text-gray-400 hover:text-white">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h5 className="font-bold text-lg mb-2">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54V12h2.54v-2.16c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.628.772-1.628 1.562V12h2.773l-.444 2.89h-2.329V21.878C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.54 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v4a6 6 0 01-6 6H8a6 6 0 01-6-6v-4a6 6 0 016-6h8zm-4 14a4 4 0 100-8 4 4 0 000 8zm6.5-14a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5C3.65 3.5 2.5 4.65 2.5 6s1.15 2.5 2.48 2.5H5c1.35 0 2.5-1.15 2.5-2.5S6.35 3.5 5 3.5h-.02zM5 9H2.5v12H5V9zm7 0h-2.5v12H12V9zm0-3c1.37 0 2.5-1.12 2.5-2.5S13.37 1 12 1 9.5 2.12 9.5 3.5 10.63 6 12 6zm1.75 3H10.5v12h3.25c2.48 0 4.5-2.02 4.5-4.5V13.5c0-2.48-2.02-4.5-4.5-4.5zM15.75 19c0 1.24-1.01 2.25-2.25 2.25H13V12.25h.5c1.24 0 2.25 1.01 2.25 2.25V19z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} E-Travel Guide. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
