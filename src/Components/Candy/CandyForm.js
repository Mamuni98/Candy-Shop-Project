import React, { useRef, useContext } from "react";
import classes from "./CandyForm.module.css"
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import ListContext from "../../Store/list-context";

const CandyForm = () => {
  const listCntxt = useContext(ListContext);
  const nameInputRef = useRef();
  const desInputRef = useRef();
  const priceInputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const description = desInputRef.current.value;
    const price = priceInputRef.current.value;
    const listOfCandies = {
      id: Math.random().toString(),
      name: name,
      description: description,
      price: Number(price),
    };
    listCntxt.onAddCandy(listOfCandies);
   event.target.reset();
  };
  return (
    <Card className={classes.form}>
      <form onSubmit={onSubmitHandler}>
        <Input
          label="Candy Name"
          ref={nameInputRef}
          input={{
            id: "name",
            type: "text",
          }}
        />
        <Input
          label="Description"
          ref={desInputRef}
          input={{
            id: "description",
            type: "text",
          }}
        />
        <Input
          label="Price"
          ref={priceInputRef}
          input={{
            id: "price",
            type: "number",
          }}
        />
        <div className={classes.actions}>
          <Button type="submit">Add Candy</Button>
        </div>
      </form>
    </Card>
  );
};

export default CandyForm;
