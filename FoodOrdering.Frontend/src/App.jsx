import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import RestaurantList from "./pages/RestaurantList";

function App() {
  const { token, logout } = useAuth();

  if (!token) {
    return <Login />;
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <RestaurantList />
    </div>
  );
}

export default App;
