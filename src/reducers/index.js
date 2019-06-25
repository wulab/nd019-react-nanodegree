import { combineReducers } from 'redux';
import authUser from './authUser';
import tweets from './tweets';
import users from './users';

export default combineReducers({ authUser, tweets, users });
