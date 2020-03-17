import React from "react";

const Button = props => {
  const handleClick = () => {
    let countryList = [props.country];
    return countryList;
  };

  return <button onClick={handleClick}>{props.text}</button>;
};
export default Button;
