import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCandyAmount, setTotalCandyAmount] = useState(Number(0));

  const postCandiesRequest = useCallback(async () => {
    try {
      await axios.put(
        "https://candy-shop-f15b9-default-rtdb.firebaseio.com/candies.json",
        cartItems
      );
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [cartItems]);

  const getCandiesHandler = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://candy-shop-f15b9-default-rtdb.firebaseio.com/candies.json"
      );
      //console.log(response.data);
      if (response.data) {
        setCartItems(response.data);
        let price = 0;
        response.data.forEach((item) => {
          price += Number(item.price) * Number(item.amount);
        });
        setTotalCandyAmount(price);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    postCandiesRequest();
  }, [postCandiesRequest]);

  useEffect(() => {
    getCandiesHandler();
  }, [getCandiesHandler]);

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

    setTotalCandyAmount((prevTotal) => {
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
  const orderCandiesInCart = async () => {
    setCartItems([]);
    setTotalCandyAmount(Number(0));
    await axios.delete(
      "https://candy-shop-f15b9-default-rtdb.firebaseio.com/candies.json"
    );
  };

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
