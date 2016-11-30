import * as types from './actionTypes';

export function setMinimumDate(date) {
    return {type: types.SET_MINIMUM_DATE, date};
}

export function setSelectedDate(date) {
    return {type: types.SET_SELECTED_DATE, date};
}