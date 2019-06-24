import { getInitialData } from '../api/tweet';
import { setAuthUser } from './authUser';

export const RECEIVE_DATA = 'RECEIVE_DATA';

function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    ...data
  };
}

export function asyncReceiveData() {
  return function(dispatch) {
    getInitialData().then(data => {
      dispatch(receiveData(data));
      dispatch(setAuthUser({ id: 'tylermcginnis' }));
    });
  };
}
