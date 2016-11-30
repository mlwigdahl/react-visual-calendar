import * as types from '../actions/actionTypes';
import initialState from './initialState';

// TODO real API here...

export default function calendarStatusReducer(state = initialState.date, action) {
    switch (action.type) {
        case types.LOAD_CALENDAR_SUCCESS: 
            return { ...state };
        case types.LOAD_DATE_SUCCESS: 
            return { ...state };
        case types.UPDATE_DATE_SUCCESS:
            return { ...state };
        case types.DELETE_DATE_SUCCESS:
            return { ...state };
        case types.INSERT_DATE_SUCCESS:
            return { ...state };
        default:
            return state; 
    }
}