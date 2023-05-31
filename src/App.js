import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CandyForm from "./Components/Candy/CandyForm";
import CandyLists from "./Components/Candy/CandyLists";
import CartButton from "./Components/Cart/CartButton";
import Cart from "./Components/Cart/Cart";
import ErrorPage from "./UI/ErrorPage";
function App() {
  const [cartShown, setCartShown] = useState(false);
  const showCartHandler = () => {
    setCartShown(true);
  };

  const hideCartHandler = () => {
    setCartShown(false);
  };
  
  return (
    <>
      <CartButton onCart={showCartHandler} />
      <Routes>
        <Route path="/" element={<CandyForm />} />
        <Route
          path="/cart"
          element={
            cartShown ? (
              <Cart onClose={hideCartHandler} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <CandyLists />
    </>
  );
}

export default App;
