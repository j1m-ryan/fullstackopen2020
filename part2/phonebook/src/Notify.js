import React from "react";
import "../src/style.css";

const Notify = ({ message }) => {
  console.log(message);

  if (message === null) {
    return null;
  }
  return <li className="personAdded">{message}</li>;
};

export default Notify;
