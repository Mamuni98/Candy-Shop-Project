import ReactDOM from "react-dom/client";
import { ListProvider } from "./Store/list-context";
import { CartProvider } from "./Store/cart-context";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ListProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ListProvider>
);
