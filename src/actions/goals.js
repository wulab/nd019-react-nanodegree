import API from 'goals-todos-api';

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal
  };
}

function removeGoalAction(goal) {
  return {
    type: REMOVE_GOAL,
    id: goal.id
  };
}

export function asyncAddGoalAction(goal, callback) {
  return function(dispatch) {
    API.saveGoal(goal.name)
      .then(goal => {
        dispatch(addGoalAction(goal));
        callback();
      })
      .catch(() => alert('There was an error. Try again.'));
  };
}

export function asyncRemoveGoalAction(goal) {
  return function(dispatch) {
    dispatch(removeGoalAction(goal));

    API.deleteGoal(goal.id).catch(() => {
      alert('An error occurred. Try again.');
      dispatch(addGoalAction(goal));
    });
  };
}
