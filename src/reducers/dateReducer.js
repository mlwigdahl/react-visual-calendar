import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function calendarStatusReducer(state = initialState.date, action) {
    switch (action.type) {
        case types.SET_MINIMUM_DATE: 
            return { ...state, minimumDate: action.date };
        case types.SET_SELECTED_DATE: 
            return { ...state, selectedDate: action.date };
        
        default:
            return state; 
    }
}