import { applyMiddleware } from 'redux';

import thunk from './thunk';
import checker from './checker';
import logger from './logger';

export default applyMiddleware(thunk, checker, logger);
