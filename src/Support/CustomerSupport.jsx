import React from 'react';

const CustomerSupport = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-400">Customer Support</h2>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-black">We're Here to Help</h3>
        <p className="text-gray-700 mb-4">
          If you have any questions or need assistance, please reach out to our customer support team. We're available Monday to Friday, 9:00 AM to 6:00 PM.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> sfg_travel@gmail.com
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Phone:</strong> 071-437018
        </p>
        <p className="text-gray-700">
          <strong>Address:</strong> New Road, Kathmandu, Nepal
        </p>
      </div>
    </div>
  );
};

export default CustomerSupport;
