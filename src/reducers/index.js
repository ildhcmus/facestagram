import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import user from './user';

const rootReducer = combineReducers({ user, posts, routing: routerReducer });

export default rootReducer;