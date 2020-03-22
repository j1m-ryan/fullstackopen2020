import React, { useState } from "react";
import personsService from "../services/persons";

const Individual = props => {
  const [deleted, setDeleted] = useState(false);
  const id = props.result;
  const name = props.name;
  const number = props.number;
  console.log("happen outside");
  const handleClick = (id, name) => {
    console.log("cicked", id);
    personsService.remove(id, name);
    if (!deleted) {
      console.log("happen inside");
      setDeleted(true);
    }
  };

  return (
    <span key={id}>
      {name} {number}
      <button onClick={() => handleClick(id, name)}>delete</button>
      <br />
    </span>
  );
};
export default Individual;
