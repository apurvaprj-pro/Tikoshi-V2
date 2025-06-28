import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { subtotal, discount, tax, total, cartItems } = location.state || {};

  if (!subtotal) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-lg text-red-600">No order details found.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Back to Cart
        </button>
      </div>
    );
  }

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, card, upi

  // Additional states for card and UPI info
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [upiId, setUpiId] = useState('');

  const handlePlaceOrder = () => {
    if (!window.confirm('Are you sure you want to place the order?')) {
      return;
    }

    // Validate payment details if necessary
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCVC) {
        alert('Please enter all card details.');
        return;
      }
      // Add card validation logic here if needed
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        alert('Please enter your UPI ID.');
        return;
      }
    }

    navigate('/thank-you');
  };

  return (
    <main className="max-w-3xl mx-auto p-6 mt-20 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-200 mb-4 max-h-60 overflow-auto">
          {cartItems.map(({ id, name, qty, price }) => (
            <li key={id} className="flex justify-between py-2">
              <span>
                {name} x {qty}
              </span>
              <span>₹{(price * qty).toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-2 text-gray-800">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">- ₹{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePlaceOrder();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Full Name
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
            />
          </div>

          <div>
            <label htmlFor="address" className="block mb-1 font-medium">
              Address
            </label>
            <textarea
              id="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="tel"
              pattern="[0-9]{10}"
              placeholder="10-digit phone number"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          {/* Conditional Inputs for Card */}
          {paymentMethod === 'card' && (
            <>
              <div>
                <label htmlFor="cardNumber" className="block mb-1 font-medium">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  required={paymentMethod === 'card'}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="cardExpiry" className="block mb-1 font-medium">
                    Expiry Date (MM/YY)
                  </label>
                  <input
                    id="cardExpiry"
                    required={paymentMethod === 'card'}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="cardCVC" className="block mb-1 font-medium">
                    CVC
                  </label>
                  <input
                    id="cardCVC"
                    required={paymentMethod === 'card'}
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    type="text"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
            </>
          )}

          {/* Conditional Input for UPI */}
          {paymentMethod === 'upi' && (
            <div>
              <label htmlFor="upiId" className="block mb-1 font-medium">
                UPI ID
              </label>
              <input
                id="upiId"
                required={paymentMethod === 'upi'}
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="example@upi"
              />
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-700 hover:bg-blue-800 cursor-pointer text-white py-3 rounded-md text-lg font-semibold"
          >
            Place Order
          </button>
        </form>
      </section>
    </main>
  );
};

export default CheckoutPage;
