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
    <div className="mt-8 bg-white rounded-lg shadow p-5 sticky bottom-4">
      <h3 className="text-lg font-semibold mb-4">Your Cart</h3>

      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.menuItemId}
            className="flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₹{item.price} × {item.quantity}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  updateQuantity(item.menuItemId, item.quantity - 1)
                }
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                −
              </button>

              <span className="w-6 text-center">{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(item.menuItemId, item.quantity + 1)
                }
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.menuItemId)}
                className="text-red-500 hover:text-red-600 ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t mt-5 pt-4 flex justify-between items-center">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-bold text-green-600">₹{total}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default CartSummary;
