// Set up your root reducer here...
import { combineReducers } from 'redux';
import * as calendar from './calendarDuck';
import * as ajax from './ajaxDuck';
import * as app from './appDuck';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
    calendars: calendar.reducer,
    ajax: ajax.reducer,
    routing: routerReducer,
    app: app.reducer,
});

const saga = function * () {
    yield [
        ...(function* (watchers) {
            for(let watcher in watchers) {
                yield watchers[watcher]();
            }
        })(calendar.sagas.watchers),
    ];
};
 
export default { reducer, saga };