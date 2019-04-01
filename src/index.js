import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const element = React.createElement(
  "section",
  { className: "section" },
  React.createElement(
    "div",
    { className: "container" },
    React.createElement("h1", { className: "title" }, "Hello World")
  )
);

ReactDOM.render(element, document.getElementById("root"));
