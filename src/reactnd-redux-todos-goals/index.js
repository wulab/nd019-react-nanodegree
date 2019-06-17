// App code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

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
    default:
      return state;
  }
}

function checker(store) {
  return function(next) {
    return function(action) {
      if (
        action.type === ADD_TODO &&
        action.todo.name.toLowerCase().includes('bitcoin')
      ) {
        return alert("Nope. That's a bad idea.");
      }

      if (
        action.type === ADD_GOAL &&
        action.goal.name.toLowerCase().includes('bitcoin')
      ) {
        return alert("Nope. That's a bad idea.");
      }

      return next(action);
    };
  };
}

const app = Redux.combineReducers({
  todos,
  goals
});

const middlewares = Redux.applyMiddleware(checker);

const store = Redux.createStore(app, middlewares);

store.subscribe(() => {
  const { todos, goals } = store.getState();

  document.getElementById('todos').innerHTML = '';
  document.getElementById('goals').innerHTML = '';

  todos.forEach(addTodoToDOM);
  goals.forEach(addGoalToDOM);
});

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 8);
}

// DOM code
function addTodo(event) {
  event.preventDefault();

  const input = document.getElementById('todoInput');
  const name = input.value;
  input.value = '';

  store.dispatch(
    addTodoAction({
      name,
      id: generateId(),
      complete: false
    })
  );
}

function toggleTodo(id, event) {
  event.preventDefault();
  store.dispatch(toggleTodoAction(id));
}

function removeTodo(id, event) {
  event.preventDefault();
  store.dispatch(removeTodoAction(id));
}

function addGoal(event) {
  event.preventDefault();

  const input = document.getElementById('goalInput');
  const name = input.value;
  input.value = '';

  store.dispatch(
    addGoalAction({
      name,
      id: generateId()
    })
  );
}

function removeGoal(id, event) {
  event.preventDefault();
  store.dispatch(removeGoalAction(id));
}

document.getElementById('todoButton').addEventListener('click', addTodo);
document.getElementById('goalButton').addEventListener('click', addGoal);

function addTodoToDOM(todo) {
  const text = document.createTextNode(todo.name);
  const button = document.createElement('button');
  const li = document.createElement('li');
  const ul = document.getElementById('todos');

  button.innerHTML = 'remove';
  button.classList.add('button');
  button.classList.add('button-clear');
  button.addEventListener('click', removeTodo.bind(null, todo.id));

  li.style.textDecoration = todo.complete ? 'line-through' : 'none';
  li.addEventListener('click', toggleTodo.bind(null, todo.id));

  li.appendChild(text);
  li.appendChild(button);
  ul.appendChild(li);
}

function addGoalToDOM(goal) {
  const text = document.createTextNode(goal.name);
  const button = document.createElement('button');
  const li = document.createElement('li');
  const ul = document.getElementById('goals');

  button.innerHTML = 'remove';
  button.classList.add('button');
  button.classList.add('button-clear');
  button.addEventListener('click', removeGoal.bind(null, goal.id));

  li.appendChild(text);
  li.appendChild(button);
  ul.appendChild(li);
}
