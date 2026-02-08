import { useEffect, useState } from "react";
import { getMyOrders } from "../api/api";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyOrders()
      .then((data) => setOrders(data))
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-lg shadow p-5 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono text-xs text-gray-600">{order.orderId}</p>

              <p className="mt-2 text-sm text-gray-500">Placed on</p>
              <p className="text-sm">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                ₹{order.totalAmount}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                  order.status === 1
                    ? "bg-blue-100 text-blue-700"
                    : order.status === 4
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusText(status) {
  switch (status) {
    case 1:
      return "Placed";
    case 2:
      return "Preparing";
    case 3:
      return "Out for delivery";
    case 4:
      return "Delivered";
    case 5:
      return "Cancelled";
    default:
      return "Unknown";
  }
}

export default OrderHistory;
