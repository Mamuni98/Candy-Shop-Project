import React, { useContext } from "react";
import Card from "../../UI/Card";
import classes from "./CandyLists.module.css";
import ListContext from "../../Store/list-context";
import Candy from "./Candy";

const CandyLists = () => {
  const listCntxt = useContext(ListContext);
 
  return (
    <Card className={classes.candy}>
      <ul>
        {listCntxt.items.map((item) => {
          return (
            <Candy
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
            />
          );
        })}
      </ul>
    </Card>
  );
};
export default CandyLists;
