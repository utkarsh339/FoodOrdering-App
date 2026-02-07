import { useEffect } from "react";
import { apiFetch } from "./api/api";

function App() {
  useEffect(() => {
    apiFetch("/restaurants")
      .then((data) => console.log("Restaurants:", data))
      .catch((err) => console.error(err));
  }, []);

  return <h1>Food Ordering App</h1>;
}

export default App;
