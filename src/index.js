import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const people = [{ name: "Tyler" }, { name: "Karen" }, { name: "Richard" }];

const element = React.createElement(
  "section",
  { className: "section" },
  React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "ol",
      null,
      people.map(person =>
        React.createElement("li", { key: person.name }, person.name)
      )
    )
  )
);

ReactDOM.render(element, document.getElementById("root"));
