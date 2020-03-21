import React, { useState, useEffect } from "react";
import Country from "./Country";

const DisplayListCountries = props => {
  let searchTerm = props.searchTerm;
  const api_key = props.api_key;
  let countryList = [];
  const [oneCountry, setOneCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(0);
  const handleClick = c => {
    console.log("c value is", c);
    console.log("props counties", props.countries);
    setOneCountry(true);
    Object.keys(props.countries).map(key => {
      if (props.countries[key].name === c) {
        setSelectedCountry(key);
      }
    });
  };

  if (oneCountry) {
    countryList = countryList.concat(props.countries[selectedCountry].name);
  } else {
    Object.keys(props.countries).map(key => {
      if (
        props.countries[key].name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        countryList = countryList.concat(props.countries[key].name);
      }
    });
  }

  if (countryList.length >= 10) {
    return <p>too many matches, specify another filter</p>;
  } else if (countryList.length === 1) {
    return (
      <Country
        country={countryList}
        countries={props.countries}
        api_key={api_key}
      />
    );
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
