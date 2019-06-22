import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

function removeTodoAction(todo) {
  return {
    type: REMOVE_TODO,
    id: todo.id
  };
}

function toggleTodoAction(todo) {
  return {
    type: TOGGLE_TODO,
    id: todo.id
  };
}

export function asyncAddTodoAction(todo, callback) {
  return function(dispatch) {
    API.saveTodo(todo.name)
      .then(todo => {
        dispatch(addTodoAction(todo));
        callback();
      })
      .catch(() => alert('There was an error. Try again.'));
  };
}

export function asyncRemoveTodoAction(todo) {
  return function(dispatch) {
    dispatch(removeTodoAction(todo));

    API.deleteTodo(todo.id).catch(() => {
      alert('An error occurred. Try again.');
      dispatch(addTodoAction(todo));
    });
  };
}

export function asyncToggleTodoAction(todo) {
  return function(dispatch) {
    dispatch(toggleTodoAction(todo));

    API.saveTodoToggle(todo.id).catch(() => {
      alert('An error occurred. Try again.');
      dispatch(toggleTodoAction(todo));
    });
  };
}
