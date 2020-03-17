import React, { useState } from "react";
import Country from "./Country";

const DisplayListCountries = props => {
  const countries = props.countries;
  let searchTerm = props.searchTerm;

  let [countryList, setCountryList] = useState([]);
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      countryList = countryList.concat(countries[i].name);
    }
  }

  const handleClick = c => {
    console.log("clicked", c);
    searchTerm = c;
    setCountryList([c]);
  };

  if (countryList.length >= 10) {
    return <p>too many matches, specify another filter</p>;
  } else if (countryList.length === 1) {
    return <Country country={countryList} countries={countries} />;
  } else {
    return countryList.map((c, i) => (
      <span key={i}>
        {c}

        <button onClick={() => handleClick(c)}>show</button>
        <br />
      </span>
    ));
  }
};
export default DisplayListCountries;
