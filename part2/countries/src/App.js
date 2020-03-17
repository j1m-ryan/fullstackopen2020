import React, { useState, useEffect } from "react";
import CountrySeach from "./Components/CountrySearch";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("effect");

    const eventHandler = response => {
      setCountries(response.data);
    };

    const promise = axios.get("https://restcountries.eu/rest/v2/all");
    promise.then(eventHandler);
  }, []);

  return <CountrySeach countries={countries} />;
};

export default App;
