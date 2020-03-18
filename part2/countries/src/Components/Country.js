import React from "react";
import Weather from "./Weather";

const Country = props => {
  const countries = props.countries;
  const chosenCountry = props.country[0];
  const api_key = props.api_key;
  let capital = "";
  let population = 0;
  let languages = [];
  let flagUrl = "";

  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name === chosenCountry) {
      capital = countries[i].capital;
      population = countries[i].population;
      flagUrl = countries[i].flag;
      let langObject = countries[i].languages;
      console.log(langObject);
      for (let j = 0; j < langObject.length; j++) {
        languages.push(langObject[j].name);
      }
      console.log(languages);
    }
  }
  console.log(flagUrl);
  return (
    <>
      <h1>{chosenCountry}</h1>
      capital {capital} <br />
      population {population}
      <br />
      <h2>languages</h2>
      <ul>
        {languages.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
      <img src={flagUrl} style={{ width: "30%" }} alt={chosenCountry} />
      <Weather api_key={api_key} country={chosenCountry} />
    </>
  );
};

export default Country;
