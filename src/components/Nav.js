import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav(props) {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeClassName="active">
            New Tweet
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
