// Set up your root reducer here...
import { combineReducers } from 'redux';
import * as calendar from './calendarDuck';
import * as ajax from './ajaxDuck';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
    calendar: calendar.reducer,
    ajax: ajax.reducer,
    routing: routerReducer
});

const saga = function * () {
    yield [...(function* (watchers) {
        for(let watcher in watchers) {
            yield watchers[watcher]();
        }
    })(calendar.sagas.watchers)];
};
 
export default { reducer, saga };