import React, { Component } from 'react';
import List from './List';
import { asyncAddGoalAction, asyncRemoveGoalAction } from '../actions/goals';
import { StoreContext } from '../context';

class Goals extends Component {
  static contextType = StoreContext;

  addGoal = event => {
    event.preventDefault();

    const store = this.context;
    const goal = { name: this.input.value };

    store.dispatch(asyncAddGoalAction(goal, () => (this.input.value = '')));
  };

  removeGoal = (goal, event) => {
    event.preventDefault();

    const store = this.context;
    store.dispatch(asyncRemoveGoalAction(goal));
  };

  render() {
    return (
      <div>
        <h1>Goals</h1>
        <List items={this.props.goals} onItemRemove={this.removeGoal} />
        <form>
          <fieldset>
            <input
              type="text"
              placeholder="Add Goal"
              ref={element => (this.input = element)}
            />
            <button className="button" onClick={this.addGoal}>
              Add Goal
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Goals;
