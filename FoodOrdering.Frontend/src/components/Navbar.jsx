function Navbar({ currentPage, onNavigate, onLogout }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">🍔 Food Ordering</h1>

        <div className="space-x-3">
          <button
            onClick={() => onNavigate("restaurants")}
            className={`px-3 py-1 rounded ${
              currentPage === "restaurants"
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Restaurants
          </button>

          <button
            onClick={() => onNavigate("orders")}
            className={`px-3 py-1 rounded ${
              currentPage === "orders"
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            My Orders
          </button>

          <button
            onClick={onLogout}
            className="ml-4 px-3 py-1 rounded text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
