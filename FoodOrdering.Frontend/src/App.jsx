import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import RestaurantList from "./pages/RestaurantList";
import { useState } from "react";
import OrderHistory from "./pages/OrderHistory";

function App() {
  const { token, logout } = useAuth();
  const [page, setPage] = useState("restaurants");

  if (!token) {
    return <Login />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Food Ordering App</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("restaurants")}>Restaurants</button>
        <button
          onClick={() => setPage("orders")}
          style={{ marginLeft: "10px" }}
        >
          My Orders
        </button>
        <button onClick={logout}>Logout</button>
      </div>
      {page === "restaurants" && <RestaurantList />}
      {page === "orders" && <OrderHistory />}
    </div>
  );
}

export default App;
