import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token, logout } = useAuth();

  if (!token) {
    return <Login />;
  }

  return (
    <div>
      <h2>Logged In</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
