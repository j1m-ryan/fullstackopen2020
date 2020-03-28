import React from "react";

const Individual = props => {
  const id = props.id;
  const name = props.name;
  const number = props.number;

  return (
    <span key={id}>
      {name} {number}
    </span>
  );
};
export default Individual;
