import {createStore, compose, applyMiddleware} from 'redux';
import root from '../ducks';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState) {
  const middlewares = [
    sagaMiddleware
  ];

  return createStore(root.reducer, initialState, compose(
    applyMiddleware(...middlewares))
  );
}

function configureStoreDev(initialState) {
  const middlewares = [
    reduxImmutableStateInvariant(),
    sagaMiddleware
  ];

  //const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const composeEnhancers = compose;
  const store = createStore(root.reducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../ducks', () => {
      const nextReducer = require('../ducks').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

let configureStore = function () {};

if (process.env.NODE_ENV === 'production') {
  configureStore = configureStoreProd;
} else {
  configureStore = configureStoreDev;
}

export default configureStore;