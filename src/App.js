import React, { useState } from "react";
import CandyForm from "./Components/Candy/CandyForm";
import CandyLists from "./Components/Candy/CandyLists";
import CartButton from "./Components/Cart/CartButton";
import Cart from "./Components/Cart/Cart";

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
      {cartShown && <Cart onClose={hideCartHandler} />}
      <CandyForm />
      <CandyLists />
    </>
  );
}

export default App;
