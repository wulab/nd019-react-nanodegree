import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class ContactList extends React.Component {
  render() {
    const people = [{ name: "Tyler" }, { name: "Karen" }, { name: "Richard" }];

    return (
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
  }
}

ReactDOM.render(<ContactList />, document.getElementById("root"));
