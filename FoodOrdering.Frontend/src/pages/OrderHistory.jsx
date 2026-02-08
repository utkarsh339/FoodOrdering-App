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
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      <ul>
        {orders.map((order) => (
          <li key={order.orderId} style={{ marginBottom: "15px" }}>
            <strong>Order ID:</strong> {order.orderId}
            <br />
            <strong>Total:</strong> ₹{order.totalAmount}
            <br />
            <strong>Status:</strong> {getStatusText(order.status)}
            <br />
            <small>{new Date(order.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
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
