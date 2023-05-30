import React, { useState } from "react";
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalFoodAmount, setTotalFoodAmount] = useState(Number(0));

  const addItemInCartHandler = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (prevItem) => prevItem.id === item.id
    );
    const existingCartItem = cartItems[existingItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount,
      };
      updatedItems = [...cartItems];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = [...cartItems, item];
    }
    setCartItems(updatedItems);

    setTotalFoodAmount((prevTotal) => {
      const totalPrice = prevTotal + item.price * Number(item.amount);
      return totalPrice;
    });
  };

  const removeItemFromCartHandler = (id) => {
    const existingItemIndex = cartItems.findIndex(
      (prevItem) => prevItem.id === id
    );
    const existingCartItem = cartItems[existingItemIndex];

    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = cartItems.filter((item) => item.id !== id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...cartItems];
      updatedItems[existingItemIndex] = updatedItem;
    }
    setCartItems(updatedItems);
    setTotalCandyAmount(totalCandyAmount - existingCartItem.price);
  };

  const increaseAmountHandler = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (prevItem) => prevItem.id === item.id
    );
    const existingCartItem = cartItems[existingItemIndex];

    const updatedItem = {
      ...existingCartItem,
      amount: existingCartItem.amount + 1,
    };
    let updatedItems = [...cartItems];
    updatedItems[existingItemIndex] = updatedItem;
    setCartItems(updatedItems);
    setTotalCandyAmount(totalCandyAmount + existingCartItem.price);
  };
  const orderCandiesInCart = () => {
    setCartItems([]);
    setTotalCandyAmount(Number(0));
  }

  const cartContext = {
    items: cartItems,
    totalAmount: totalCandyAmount,
    addItem: addItemInCartHandler,
    removeItem: removeItemFromCartHandler,
    increaseAmount: increaseAmountHandler,
    order: orderCandiesInCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContext;
