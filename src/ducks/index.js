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

 const saga = function* () {
     yield [
         calendar.sagas.watchers.LOAD_CALENDAR_REQUEST(),
         calendar.sagas.watchers.LOAD_DATE_RANGE_REQUEST(),
         calendar.sagas.watchers.INSERT_DATE_REQUEST(),
         calendar.sagas.watchers.UPDATE_DATE_REQUEST(),
         calendar.sagas.watchers.DELETE_DATE_REQUEST(),
         calendar.sagas.watchers.LOAD_DATEICON_REQUEST(),
         calendar.sagas.watchers.UPDATE_DATEICON_REQUEST()
     ];
 };
 
 export default { reducer, saga };