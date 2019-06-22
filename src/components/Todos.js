import React from 'react';
import List from './List';
import {
  asyncAddTodoAction,
  asyncRemoveTodoAction,
  asyncToggleTodoAction
} from '../actions/todos';
import { StoreContext } from '../contexts/store';

class Todos extends React.Component {
  static contextType = StoreContext;

  addTodo = event => {
    event.preventDefault();

    const store = this.context;
    const todo = { name: this.input.value, complete: false };

    store.dispatch(asyncAddTodoAction(todo, () => (this.input.value = '')));
  };

  removeTodo = (todo, event) => {
    event.preventDefault();

    const store = this.context;
    store.dispatch(asyncRemoveTodoAction(todo));
  };

  toggleTodo = (todo, event) => {
    event.preventDefault();

    const store = this.context;
    store.dispatch(asyncToggleTodoAction(todo));
  };

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <List
          items={this.props.todos}
          onItemRemove={this.removeTodo}
          onItemToggle={this.toggleTodo}
        />
        <form>
          <fieldset>
            <input
              type="text"
              placeholder="Add Todo"
              ref={element => (this.input = element)}
            />
            <button className="button" onClick={this.addTodo}>
              Add Todo
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Todos;
