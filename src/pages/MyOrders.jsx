import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialOrders = [
  {
    id: 'ORD123456',
    date: '2025-06-18',
    status: 'Delivered',
    items: ['Product A', 'Product B'],
    amount: '₹1,299',
    paymentMethod: 'UPI - GPay',
    address: '12-4/5, MG Road, Hyderabad, Telangana',
    deliveredOn: '2025-06-19',
  },
  {
    id: 'ORD123457',
    date: '2025-06-15',
    status: 'Pending',
    items: ['Product C'],
    amount: '₹799',
    paymentMethod: 'Cash on Delivery',
    address: '78, Park Street, Kolkata, West Bengal',
    expectedDelivery: '2025-06-21',
  },
  {
    id: 'ORD123458',
    date: '2025-06-10',
    status: 'Cancelled',
    items: ['Product D', 'Product E', 'Product F'],
    amount: '₹2,099',
    paymentMethod: 'Credit Card - HDFC',
    address: '23, Residency Road, Bengaluru, Karnataka',
  },
];

const statusStyles = {
  Delivered: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const MyOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const handleCancelConfirmed = () => {
    const updatedOrders = orders.map((order) =>
      order.id === selectedOrderId && order.status === 'Pending'
        ? { ...order, status: 'Cancelled' }
        : order
    );
    setOrders(updatedOrders);
    setShowModal(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 mt-20">
      <div className="max-w-3xl mx-auto">
        {orders.length === 0 ? (
          <div className="text-center text-gray-600">You have no orders yet.</div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-medium text-gray-700">Order ID:</span> {order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Placed on:</span> {order.date}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Items:</span> {order.items.join(', ')} ({order.items.length} item{order.items.length > 1 ? 's' : ''})
                </div>

                <div className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Delivery Address:</span> {order.address}
                </div>

                <div className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Payment Method:</span> {order.paymentMethod}
                </div>

                {order.status === 'Delivered' && (
                  <div className="text-sm text-green-700 mb-2">
                    <span className="font-medium">Delivered On:</span> {order.deliveredOn}
                  </div>
                )}

                {order.status === 'Pending' && (
                  <div className="text-sm text-yellow-700 mb-2">
                    <span className="font-medium">Expected Delivery:</span> {order.expectedDelivery}
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm font-semibold text-gray-900">
                    Total Amount: {order.amount}
                  </div>

                  {order.status === 'Pending' && (
                    <button
                      onClick={() => openModal(order.id)}
                      className="px-4 py-1.5 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white/90 rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Cancel Order</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to cancel this order?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
              >
                No
              </button>
              <button
                onClick={handleCancelConfirmed}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
