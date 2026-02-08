const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API request failed");
  }

  return response.json();
}

export async function loginUser(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getRestaurants() {
  return apiFetch("/restaurants");
}

export function getMenuByRestaurant(restaurantId) {
  return apiFetch(`/menu-items/restaurant/${restaurantId}`);
}

export function placeOrder(restaurantId, cartItems) {
  const payload = {
    restaurantId,
    items: cartItems.map((item) => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
    })),
  };

  return apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getMyOrders() {
  return apiFetch("/orders/my");
}
