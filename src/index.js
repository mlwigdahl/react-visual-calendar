/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore, { sagaMiddleware } from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

/**/
//import { setMinimumDate, setSelectedDate } from './actions/dateActions';
require('./favicon.ico');
import './styles/styles.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import root from './ducks';

const store = configureStore();

sagaMiddleware.run(root.saga);

// initial store population

/*
const today = new Date();
const minDate = Number(new Date()) - (24*60*60*1000) * 52; // One week before today

store.dispatch(setMinimumDate(minDate));
store.dispatch(setSelectedDate(today));
*/

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>, document.getElementById('app')
);