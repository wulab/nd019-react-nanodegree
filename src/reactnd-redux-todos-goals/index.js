// Library code
function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);
    return () => unsubscribe(listener);
  };

  const unsubscribe = listener => {
    listeners = listeners.filter(l => l !== listener);
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

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

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
}

// Passing the root reducer to our store since our createStore function can only take one reducer.
const store = createStore(app);

store.subscribe(() => {
  const { todos, goals } = store.getState();

  document.getElementById('todos').innerHTML = '';
  document.getElementById('goals').innerHTML = '';

  todos.forEach(addTodoToDOM);
  goals.forEach(addGoalToDOM);
});

// store.dispatch(
//   addTodoAction({
//     todo: {
//       id: 0,
//       name: 'Learn Redux',
//       complete: false
//     }
//   })
// );

// store.dispatch(
//   addTodoAction({
//     todo: {
//       id: 1,
//       name: 'Read a Book',
//       complete: false
//     }
//   })
// );

// store.dispatch(toggleTodoAction(1));

// store.dispatch(removeTodoAction(0));

// store.dispatch(
//   addGoalAction({
//     goal: {
//       id: 0,
//       name: 'Learn Redux'
//     }
//   })
// );

// store.dispatch(
//   addGoalAction({
//     goal: {
//       id: 1,
//       name: 'Lose 20 pounds'
//     }
//   })
// );

// store.dispatch(removeGoalAction(0));

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

document.getElementById('todoButton').addEventListener('click', addTodo);
document.getElementById('goalButton').addEventListener('click', addGoal);

function addTodoToDOM(todo) {
  const text = document.createTextNode(todo.name);
  const li = document.createElement('li');
  const ul = document.getElementById('todos');

  li.appendChild(text);
  ul.appendChild(li);
}

function addGoalToDOM(goal) {
  const text = document.createTextNode(goal.name);
  const li = document.createElement('li');
  const ul = document.getElementById('goals');

  li.appendChild(text);
  ul.appendChild(li);
}
