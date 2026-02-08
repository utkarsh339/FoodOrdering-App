import { useEffect, useState } from "react";
import { getMenuByRestaurant } from "../api/api";
import { useCart } from "../context/CartContext";
import CartSummary from "../components/CartSummary";

function MenuPage({ restaurant, onBack }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, clearCart } = useCart();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError("");

    getMenuByRestaurant(restaurant.id)
      .then((data) => setMenu(data))
      .catch(() => setError("Failed to load menu"))
      .finally(() => setLoading(false));
  }, [restaurant.id]);

  useEffect(() => {
    clearCart();
  }, [restaurant.id]);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <button
        onClick={onBack}
        className="text-sm text-gray-600 hover:text-orange-500 mb-4"
      >
        ← Back to restaurants
      </button>

      <h2 className="text-2xl font-semibold mb-4">{restaurant.name} Menu</h2>

      {menu.length === 0 && <p>No items available</p>}

      <div className="mt-6">
        {menu.length === 0 && (
          <p className="text-gray-500">No items available</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {menu.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  ₹{item.price}
                </span>

                <button
                  onClick={() =>
                    addToCart({
                      menuItemId: item.id,
                      name: item.name,
                      price: item.price,
                    })
                  }
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CartSummary restaurantId={restaurant.id} />
    </div>
  );
}

export default MenuPage;
