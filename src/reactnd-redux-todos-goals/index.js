// App code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const RECEIVE_DATA = 'RECEIVE_DATA';

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id
  };
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id
  };
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal
  };
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id
  };
}

function receiveDataAction(data) {
  return {
    type: RECEIVE_DATA,
    ...data
  };
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id !== action.id ? todo : { ...todo, complete: !todo.complete }
      );
    case RECEIVE_DATA:
      return action.todos;
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    case RECEIVE_DATA:
      return action.goals;
    default:
      return state;
  }
}

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 8);
}

// Middleware code
function checker(store) {
  return function(next) {
    return function(action) {
      if (
        action.type === ADD_TODO &&
        action.todo.name.toLowerCase().includes('bitcoin')
      ) {
        return alert("Nope. That's a bad idea.");
      }

      if (action.type === ADD_TODO) {
        alert("Don't forget to " + action.todo.name + '!');
      }

      if (
        action.type === ADD_GOAL &&
        action.goal.name.toLowerCase().includes('bitcoin')
      ) {
        return alert("Nope. That's a bad idea.");
      }

      if (action.type === ADD_GOAL) {
        alert("That's a great goal!");
      }

      return next(action);
    };
  };
}

function logger(store) {
  return function(next) {
    return function(action) {
      console.group(action.type);
      console.log('The action:', action);

      const result = next(action);

      console.log('The new state:', store.getState());
      console.groupEnd();

      return result;
    };
  };
}

// Main code
const app = Redux.combineReducers({
  todos,
  goals
});

const middlewares = Redux.applyMiddleware(checker, logger);

const store = Redux.createStore(app, middlewares);
