import { useEffect, useState } from "react";
import { getMenuByRestaurant } from "../api/api";
import { useCart } from "../context/CartContext";
import CartSummary from "../components/CartSummary";

function MenuPage({ restaurant, onBack }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    getMenuByRestaurant(restaurant.id)
      .then((data) => setMenu(data))
      .catch(() => setError("Failed to load menu"))
      .finally(() => setLoading(false));
  }, [restaurant.id]);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <button onClick={onBack}>⬅ Back</button>

      <h2>{restaurant.name} - Menu</h2>

      {menu.length === 0 && <p>No items available</p>}

      <ul>
        {menu.map((item) => (
          <li key={item.id} style={{ marginBottom: "15px" }}>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <strong>₹{item.price}</strong>
            <br />
            <button
              onClick={() =>
                addToCart({
                  menuItemId: item.id,
                  name: item.name,
                  price: item.price,
                })
              }
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <CartSummary />
    </div>
  );
}

export default MenuPage;
