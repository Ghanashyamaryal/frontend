import React from 'react';

const TermsConditions = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-500 ">Terms & Conditions</h2>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-black">1. Introduction</h3>
        <p className="text-gray-700 mb-4">
          Welcome to E-Travel and Guide. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h3 className="text-xl font-bold mb-4  text-black">2. Booking and Payments</h3>
        <p className="text-gray-700 mb-4">
          All bookings made through our website are subject to availability. Payment must be made in full at the time of booking. We accept major credit cards and online payment methods.
        </p>

        <h3 className="text-xl font-bold mb-4  text-black">3. Cancellation and Refunds</h3>
        <p className="text-gray-700 mb-4">
          Cancellations must be made at least 7 days before the scheduled travel date to receive a full refund. Cancellations made within 7 days will be subject to a cancellation fee.
        </p>

        <h3 className="text-xl font-bold mb-4  text-black">4. Use of Our Website</h3>
        <p className="text-gray-700 mb-4">
          You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others. Unauthorized use of our website may give rise to a claim for damages.
        </p>

        <h3 className="text-xl font-bold mb-4  text-black">5. Privacy Policy</h3>
        <p className="text-gray-700 mb-4">
          We value your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
        </p>

        <h3 className="text-xl font-bold mb-4  text-black">6. Changes to Terms</h3>
        <p className="text-gray-700">
          We reserve the right to change these terms and conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our website constitutes acceptance of the modified terms.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
