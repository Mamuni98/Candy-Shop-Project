import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
const ListContext = React.createContext({
  items: [],
  onAddCandy: (list) => {},
});

export const ListProvider = (props) => {
  
  const [candyLists, setCandyLists] = useState([]);
  const getCandyLists = useCallback(async () => {
    const response = await axios.get(
      "https://candy-list-default-rtdb.firebaseio.com/candylist.json"
    );
    //console.log(response.data);
    if (response.data) {
      let lists = [];
      for (let key in response.data) {
        lists.push(response.data[key]);
      }
      console.log(lists);
      setCandyLists(lists);
    }
  }, []);
  useEffect(() => {
    getCandyLists();
  }, [getCandyLists]);

  const addCandyToListHandler = async (list) => {
    setCandyLists((prevlist) => {
      return [list, ...prevlist];
    });
    await axios.post(
      "https://candy-list-default-rtdb.firebaseio.com/candylist.json",
      list
    );
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
