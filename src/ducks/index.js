// Set up your root reducer here...
import { combineReducers } from 'redux';
import * as calendar from './calendarDuck';
import * as async from './asyncDuck';
import * as app from './appDuck';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
    calendars: calendar.reducer,
    async: async.reducer,
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