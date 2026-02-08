import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantList from "./pages/RestaurantList";
import OrderHistory from "./pages/OrderHistory";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token, logout } = useAuth();
  const [page, setPage] = useState("restaurants");
  const [authPage, setAuthPage] = useState("login");

  if (!token) {
    return authPage === "login" ? (
      <Login onSwitchToRegister={() => setAuthPage("register")} />
    ) : (
      <Register onSwitchToLogin={() => setAuthPage("login")} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentPage={page} onNavigate={setPage} onLogout={logout} />

      <main className="max-w-5xl mx-auto p-4">
        {page === "restaurants" && <RestaurantList />}
        {page === "orders" && <OrderHistory />}
      </main>
    </div>
  );
}

export default App;
