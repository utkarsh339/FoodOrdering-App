import { useState } from "react";
import { registerUser } from "../api/api";
import AuthLayout from "../components/AuthLayout";

function Register({ onSwitchToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerUser({
        fullName,
        email,
        password,
        role,
      });

      setSuccess("Registration successful. Please login.");
      setTimeout(() => onSwitchToLogin(), 1000);
    } catch (err) {
      setError("Registration failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Register">
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="Customer">Customer</option>
          <option value="Restaurant">Restaurant</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-orange-600 hover:underline"
        >
          Login
        </button>
      </p>
    </AuthLayout>
  );
}

export default Register;
