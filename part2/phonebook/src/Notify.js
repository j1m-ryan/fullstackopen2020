import React from "react";
import "../src/style.css";

const Notify = ({ message }) => {
  console.log(message);

  if (message === null) {
    return null;
  }
  if (message.charAt(1) === "l") {
    return <li className="deleted">{message}</li>;
  }
  return <li className="personAdded">{message}</li>;
};

export default Notify;
