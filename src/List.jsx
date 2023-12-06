import { useState, useEffect } from "react";

const List = ({ getItems }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log("updating list");
    setItems(getItems());
  }, [getItems]);
  return items.map((item) => <div key={item}>{item}</div>);
};
export default List;
