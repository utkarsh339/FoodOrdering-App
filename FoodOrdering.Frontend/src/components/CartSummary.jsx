import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/api";
// import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function CartSummary({ restaurantId }) {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (cartItems.length === 0) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");

    try {
      await placeOrder(restaurantId, cartItems);
      alert("Order placed successfully");
      clearCart();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ borderTop: "1px solid #ccc", marginTop: "20px" }}>
      <h3>Cart</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {cartItems.map((item) => (
        <div key={item.menuItemId}>
          <strong>{item.name}</strong> – ₹{item.price}
          <br />
          <button
            onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
          >
            -
          </button>
          <span style={{ margin: "0 10px" }}>{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
          >
            +
          </button>
          <button onClick={() => removeFromCart(item.menuItemId)}>❌</button>
        </div>
      ))}
      <h4>Total: ₹{total}</h4>

      <button onClick={handlePlaceOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default CartSummary;
