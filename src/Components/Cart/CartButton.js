import React, { useContext } from "react";
import CartIcon from "./CartIcon";
import classes from "./CartButton.module.css";
import CartContext from "../../Store/cart-context";
const CartButton = (props) => {
  const cartCnxt = useContext(CartContext);

  const numberOfCartItems = cartCnxt.items.reduce((currNumber, item) => {
    return currNumber + Number(item.amount);
  }, 0);
  return (
    <button className={classes.button} onClick={props.onCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
