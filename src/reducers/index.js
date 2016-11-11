// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import { routerReducer } from 'react-router-redux';

 const rootReducer = combineReducers({
     // other reducers here...
     routing: routerReducer
 });
 
 export default rootReducer;