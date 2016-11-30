/* eslint-disable import/default */

import * as types from './actionTypes';
import CalendarApi from '../api/mockCalendarApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

// TODO need to define the shape of incoming data here...

export function loadCalendarSuccess(data) {
    return { type: types.LOAD_CALENDAR_SUCCESS, data };
}

export function loadDateSuccess(data) {
    return { type: types.LOAD_DATE_SUCCESS, data };
}

export function loadDateIconSuccess(data) {
    return { type: types.LOAD_DATE_ICON_SUCCESS, data };
}  

export function updateDateSuccess(data) {
    return { type: types.UPDATE_DATE_SUCCESS, data };
}

export function deleteDateSuccess(data) {
    return { type: types.DELETE_DATE_SUCCESS, data };
}

export function insertDateSuccess(data) {
    return { type: types.INSERT_DATE_SUCCESS, data };
}

export function updateDateIconSuccess(data) {
    return { type: types.UPDATE_DATE_ICON_SUCCESS, data };
}

export function loadCalendar(start, end) {

}

export function loadDate(date) {

}

export function loadDateIcon(date) {

}

export function updateDate(date, data) {

}

export function deleteDate(date) {

}

export function insertDate(date, data) {

}

export function updateDateIcon(date, icon) {

}

// TODO probably need something to identify who this is (context?  global state?)