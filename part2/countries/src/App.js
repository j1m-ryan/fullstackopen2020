import React, { useState, useEffect } from "react";
import CountrySeach from "./Components/CountrySearch";
import axios from "axios";

const App = api_key => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const eventHandler = response => {
      setCountries(response.data);
    };

    const promise = axios.get("https://restcountries.eu/rest/v2/all");
    promise.then(eventHandler);
  }, []);

  return <CountrySeach countries={countries} api_key={api_key} />;
};

export default App;
