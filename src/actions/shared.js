import API from 'goals-todos-api';

export const RECEIVE_DATA = 'RECEIVE_DATA';

function receiveDataAction(data) {
  return {
    type: RECEIVE_DATA,
    ...data
  };
}

export function asyncReceiveDataAction() {
  return function(dispatch) {
    Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
      dispatch(receiveDataAction({ todos, goals }));
    });
  };
}
