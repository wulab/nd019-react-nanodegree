import React from 'react';

function List(props) {
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>
          <span
            style={{
              textDecoration: item.complete ? 'line-through' : 'none'
            }}
            onClick={event =>
              props.onItemToggle && props.onItemToggle(item, event)
            }
          >
            {item.name}
          </span>
          <button
            className="button button-clear"
            onClick={event => props.onItemRemove(item, event)}
          >
            remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default List;
