import { useEffect, useState } from "react";
import { getRestaurants } from "../api/api";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRestaurants()
      .then((data) => setRestaurants(data))
      .catch(() => setError("Failed to load restaurants"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Restaurants</h2>

      {restaurants.length === 0 && <p>No restaurants available</p>}

      <ul>
        {restaurants.map((r) => (
          <li key={r.id} style={{ marginBottom: "15px" }}>
            <h3>{r.name}</h3>
            <p>{r.description}</p>
            <p>
              <strong>Address:</strong> {r.address}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
