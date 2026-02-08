import { useCart } from "../context/CartContext";

function CartSummary() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div style={{ borderTop: "1px solid #ccc", marginTop: "20px" }}>
      <h3>Cart</h3>

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
    </div>
  );
}

export default CartSummary;
