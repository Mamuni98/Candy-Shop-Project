import { useContext } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../../Store/cart-context";

const CartItem = (props) => {
  const cartCnxt = useContext(CartContext);
  const price = `Rs.${props.price.toFixed(2)}`;
  const removeItemHandler = (event) => {
    event.preventDefault();
    cartCnxt.removeItem(props.id);
  };
  const increaseAmountHandler = (event) => {
    event.preventDefault();
    cartCnxt.increaseAmount(props);
  }

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeItemHandler}>−</button>
        <button onClick={increaseAmountHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
