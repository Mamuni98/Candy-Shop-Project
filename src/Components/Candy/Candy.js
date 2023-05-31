import classes from "./Candy.module.css";
import CandyListForm from "./CandyListForm";

const Candy = (props) => {
 
  return (
    <li className={classes.list}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>Rs.{props.price.toFixed(2)}</div>
      </div>
      <div>
        <CandyListForm items={props} id={props.id} />
      </div>
    </li>
  );
};
export default Candy;
