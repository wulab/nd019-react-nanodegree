import { appReducer } from './StudentMain';

test('deletes a flavor from the state', () => {
  const initialState = [
    { flavor: 'Chocolate', count: 36 },
    { flavor: 'Vanilla', count: 210 }
  ];
  const action = { type: 'DELETE_FLAVOR', flavor: 'Vanilla' };
  expect(appReducer(initialState, action)).toEqual([
    { flavor: 'Chocolate', count: 36 }
  ]);
});
