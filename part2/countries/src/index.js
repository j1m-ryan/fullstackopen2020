import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
//let api_key = process.env.REACT_APP_API_KEY;
const api_key = "63aa57dc24fd32045c59858b3cb51584";
ReactDOM.render(<App api_key={api_key} />, document.getElementById("root"));
