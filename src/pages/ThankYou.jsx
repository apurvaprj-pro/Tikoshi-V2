import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You for Your Order!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your order has been placed successfully.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 px-6 rounded"
      >
        Continue Shopping
      </button>
    </main>
  );
};

export default ThankYouPage;
