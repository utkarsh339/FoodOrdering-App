import { useEffect, useState } from "react";
import { getRestaurants } from "../api/api";
import MenuPage from "./MenuPage";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRestaurants()
      .then((data) => setRestaurants(data))
      .catch(() => setError("Failed to load restaurants"))
      .finally(() => setLoading(false));
  }, []);

  if (selectedRestaurant) {
    return (
      <MenuPage
        restaurant={selectedRestaurant}
        onBack={() => setSelectedRestaurant(null)}
      />
    );
  }

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Restaurants</h2>

      {restaurants.length === 0 && (
        <p className="text-gray-500">No restaurants available</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-800">{r.name}</h3>

              <p className="text-sm text-gray-600 mt-2">{r.description}</p>

              <p className="text-sm text-gray-500 mt-2">📍 {r.address}</p>
            </div>

            <button
              onClick={() => setSelectedRestaurant(r)}
              className="mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            >
              View Menu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
