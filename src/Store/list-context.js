import React, { useState } from "react";
const ListContext = React.createContext({
  items: [],
  onAddCandy: (list) => {},
});

export const ListProvider = (props) => {
  const [candyLists, setCandyLists] = useState([]);

  const addCandyToListHandler = (list) => {
    setCandyLists((prevlist) => {
      return [list, ...prevlist];
    });
  };

  return (
    <ListContext.Provider
      value={{
        items: candyLists,
        onAddCandy: addCandyToListHandler,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};
export default ListContext;
