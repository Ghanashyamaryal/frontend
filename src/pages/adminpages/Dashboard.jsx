import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg py-4 px-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </header>

      <main className="flex-1 flex">
      
        <aside className="w-64 bg-white shadow-md p-6">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/admin/hotels"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/treks"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  Treks
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/destinations"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/festivals"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  Festivals
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/packages"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/nearbyattractions"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  Nearby Attractions
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/planyourtrip"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg"
                >
                  Plan Your Trip
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        
        <section className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl text-black font-bold mb-4">Welcome to Admin Dashboard</h2>
            <p className="text-gray-600">
              Use the sidebar to navigate through the admin panel sections.
              Manage Hotels, Treks, Destinations, Festivals, Packages, and more
              easily from here.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">&copy; 2025 Admin Dashboard. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
