import { createStore, compose, applyMiddleware  } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import history from './history';

// import the root reducer
import rootReducer from './../reducers/index';

// create an object for the default data
const initState = {
  user: {
    id: null,
    email: null,
    picture: null,
    accessToken: null,
  },
  posts: {},
};

const store = createStore(rootReducer, initState, compose(
  applyMiddleware(routerMiddleware(history)),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

if(module.hot) {
  module.hot.accept('./../reducers/',() => {
    const nextRootReducer = require('./../reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;