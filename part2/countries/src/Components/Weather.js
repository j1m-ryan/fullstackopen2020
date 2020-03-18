import React, { useState } from "react";
import axios from "axios";

const Weather = props => {
  const [temperature, setTemperature] = useState(0);
  const [api_key, setKey] = useState(props.api_key);
  const [imgUrl, setImageUrl] = useState("");
  const [weatherDesc, setWeatherDesc] = useState([]);
  console.log("apikey", props.api_key);
  console.log("country", props.country);
  const country = props.country;

  console.log("api", api_key);
  if (props.api_key === "63aa57dc24fd32045c59858b3cb51584") {
    console.log("its true");
  }
  console.log("http://api.weatherstack.com/current?access_key=", { api_key });
  console.log(
    "http://api.weatherstack.com/current?access_key=",
    "63aa57dc24fd32045c59858b3cb51584"
  );

  const update = response => {
    console.log(response.data);
    setTemperature(response.data.current.temperature);
    setWeatherDesc(response.data.current.weather_descriptions[0]);
    setImageUrl(response.data.current.weather_icons[0]);
  };

  const promise = axios
    .get(
      "http://api.weatherstack.com/current?access_key=" +
        "63aa57dc24fd32045c59858b3cb51584" +
        "&query=" +
        country
    )
    .then(update);

  return (
    <>
      <h1>Weather</h1>

      <h2>{country}</h2>
      <h2>temperature: {temperature} degrees C</h2>
      <p>{weatherDesc}</p>
      <img src={imgUrl} alt={weatherDesc} />
    </>
  );
};

export default Weather;
