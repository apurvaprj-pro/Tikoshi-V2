import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialCartItems = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 19999,
    image: 'https://placehold.co/150x150?text=Smartphone',
    qty: 1,
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 2499,
    image: 'https://placehold.co/150x150?text=Headphones',
    qty: 2,
  },
  {
    id: 3,
    name: 'Microwave Oven',
    price: 7499,
    image: 'https://placehold.co/150x150?text=Microwave',
    qty: 1,
  },
];

// Discount codes
const discountCodes = [
  { code: 'TIKOSHI10', type: 'percent', amount: 10 }, // 10% off
  { code: 'SAVE500', type: 'flat', amount: 500 },     // ₹500 off
  { code: 'WELCOME5', type: 'percent', amount: 5 },   // 5% off
];

const CartPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const [appliedCode, setAppliedCode] = useState('');

  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const applyDiscountCode = () => {
    const code = discountCode.trim().toUpperCase();

    if (!code) {
      setDiscountError('Please enter a discount code.');
      setDiscount(0);
      setAppliedCode('');
      return;
    }

    const found = discountCodes.find((dc) => dc.code === code);

    if (!found) {
      setDiscountError('Invalid discount code.');
      setDiscount(0);
      setAppliedCode('');
      return;
    }

    setDiscountError('');
    let discountAmount = 0;

    if (found.type === 'percent') {
      discountAmount = (subtotal * found.amount) / 100;
    } else {
      discountAmount = found.amount;
    }

    if (discountAmount > subtotal) discountAmount = subtotal;

    setDiscount(discountAmount);
    setAppliedCode(code);
  };

  const tax = (subtotal - discount) * 0.18; // 18% GST
  const total = subtotal - discount + tax;

  const handleProceedToCheckout = () => {
    navigate('/checkout', {
      state: { subtotal, discount, tax, total, cartItems },
    });
  };

  return (
    <main className="max-w-7xl mx-auto p-6 mt-20">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <section className="flex-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Items in your cart</h2>
            <ul className="divide-y divide-gray-200">
              {cartItems.map(({ id, name, price, image, qty }) => (
                <li key={id} className="flex items-center py-4">
                  <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{name}</h3>
                    <p className="mt-1 text-blue-700 font-semibold">
                      ₹{price.toLocaleString()}
                    </p>
                    <div className="mt-2 flex items-center space-x-4">
                      <label htmlFor={`qty-${id}`} className="text-sm font-medium">
                        Qty:
                      </label>
                      <input
                        id={`qty-${id}`}
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) => handleQtyChange(id, parseInt(e.target.value))}
                        className="w-16 border rounded px-2 py-1 text-center"
                      />
                      <button
                        onClick={() => handleRemove(id)}
                        className="text-red-600 hover:text-red-800 font-semibold text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Discount Code Input */}
            <div className="mt-6">
              <label
                htmlFor="discountCode"
                className="block mb-2 font-semibold text-gray-700"
              >
                Have a discount code?
              </label>
              <div className="flex gap-2 max-w-xs">
                <input
                  id="discountCode"
                  type="text"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  onClick={applyDiscountCode}
                  className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {discountError && (
                <p className="mt-2 text-red-600 text-sm">{discountError}</p>
              )}
              {!discountError && appliedCode && (
                <p className="mt-2 text-green-600 text-sm">
                  Discount code <strong>{appliedCode}</strong> applied! You saved ₹
                  {discount.toFixed(2)}
                </p>
              )}
            </div>
          </section>

          {/* Price Summary */}
          <aside className="w-full max-w-md bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-6">Price Details</h2>
            <div className="space-y-3 text-gray-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-600">- ₹{discount.toFixed(2)}</span>
                </div>
              )}

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

            <button
              disabled={cartItems.length === 0}
              onClick={handleProceedToCheckout}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartPage;
