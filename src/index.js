import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ListProvider } from "./Store/list-context";
import { CartProvider } from "./Store/cart-context";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ListProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ListProvider>
  </BrowserRouter>
);
