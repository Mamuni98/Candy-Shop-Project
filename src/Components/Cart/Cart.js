import { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../../UI/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCnxt = useContext(CartContext);
  const hasItem = cartCnxt.items.length > 0;
 
  const totalFoodPrice = `Rs.${cartCnxt.totalAmount.toFixed(2)}`;
  const orderItemsHandler = (event) => {
    event.preventDefault();
    cartCnxt.order();
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCnxt.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalFoodPrice}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && <button className={classes.button} onClick={orderItemsHandler}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;