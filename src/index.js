import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const people = [{ name: "Tyler" }, { name: "Karen" }, { name: "Richard" }];

const element = (
  <section className="section">
    <div className="container">
      <ol>
        {people.map(person => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ol>
    </div>
  </section>
);

ReactDOM.render(element, document.getElementById("root"));
