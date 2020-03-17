import React, { useState } from "react";
import DisplayListCountries from "./DisplayListCountries";

const CountrySearch = props => {
  const [searchTerm, setInput] = useState("");
  const countries = props.countries;

  const handleCountries = event => {
    setInput(event.target.value);
  };

  return (
    <>
      find countries
      <input onChange={handleCountries} value={searchTerm} />
      <br />
      <DisplayListCountries searchTerm={searchTerm} countries={countries} />
    </>
  );
};

export default CountrySearch;
