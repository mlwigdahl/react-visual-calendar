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

function* sagaLoader(watchers) {
    for(let watcher in watchers) {
        yield watchers[watcher]();
    }
}

const saga = function * () {
    yield [
        ...(sagaLoader)(calendar.sagas.watchers),
        ...(sagaLoader)(app.sagas.watchers),
    ];
};
 
export default { reducer, saga };