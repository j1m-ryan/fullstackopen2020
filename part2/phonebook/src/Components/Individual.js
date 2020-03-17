import React from "react";

const Individual = props => {
  const id = props.result;
  const name = props.name;
  const number = props.number;
  return (
    <span key={id}>
      {name} {number}
      <br />
    </span>
  );
};
export default Individual;
