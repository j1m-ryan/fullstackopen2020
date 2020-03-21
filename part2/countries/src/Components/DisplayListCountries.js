import React, { useState } from "react";
import Country from "./Country";

const DisplayListCountries = props => {
  let searchTerm = props.searchTerm;
  const api_key = props.api_key;
  let countryList = [];
  const [oneCountry, setOneCountry] = useState(props.oneCountry);
  const [selectedCountry, setSelectedCountry] = useState(null);
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

  if (selectedCountry != null) {
    console.log("outside", props.countries[selectedCountry].name);
    if (
      !props.countries[selectedCountry].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      console.log(
        props.countries[selectedCountry].name,
        "does not contain",
        searchTerm
      );
      setOneCountry(false);
      countryList = [];
      setSelectedCountry(null);
    }
  }

  if (oneCountry) {
    console.log("selectedCountry", selectedCountry);
    console.log("props.countries", props.countries);
    console.log(
      "props.countresselected",
      props.countries[selectedCountry].name
    );
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
