import React from "react";
import Country from "./Country";

const DisplayListCountries = props => {
  const countries = props.countries;
  const searchTerm = props.searchTerm;

  let countryList = [];
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      countryList = countryList.concat(countries[i].name);
    }
  }
  if (countryList.length >= 10) {
    return <p>too many matches, specify another filter</p>;
  } else if (countryList.length === 1) {
    return <Country country={countryList} countries={countries} />;
  } else {
    return countryList.map((c, i) => (
      <span key={i}>
        {c}
        <br />
      </span>
    ));
  }
};
export default DisplayListCountries;
