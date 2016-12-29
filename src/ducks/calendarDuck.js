// TODO -- need to make sure the saga exceptions are properly cracked into strings...

import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import initialState from './initialState';
import CalendarApi from '../api/mockCalendarApi';
import * as ajax from './ajaxDuck';

// actions

export const actions = {
    LOAD_CALENDAR_SUCCESS: 'react-visual-calendar/calendar/LOAD_CALENDAR_SUCCESS',
    LOAD_CALENDAR_FAILURE: 'react-visual-calendar/calendar/LOAD_CALENDAR_FAILURE',
    LOAD_CALENDAR_REQUEST: 'react-visual-calendar/calendar/LOAD_CALENDAR_REQUEST',

    LOAD_DATE_RANGE_SUCCESS: 'react-visual-calendar/calendar/LOAD_DATE_RANGE_SUCCESS',
    LOAD_DATE_RANGE_FAILURE: 'react-visual-calendar/calendar/LOAD_DATE_RANGE_FAILURE',
    LOAD_DATE_RANGE_REQUEST: 'react-visual-calendar/calendar/LOAD_DATE_RANGE_REQUEST',

    INSERT_DATE_SUCCESS: 'react-visual-calendar/calendar/INSERT_DATE_SUCCESS',
    INSERT_DATE_FAILURE: 'react-visual-calendar/calendar/INSERT_DATE_FAILURE',
    INSERT_DATE_REQUEST: 'react-visual-calendar/calendar/INSERT_DATE_REQUEST',

    UPDATE_DATE_SUCCESS: 'react-visual-calendar/calendar/UPDATE_DATE_SUCCESS',
    UPDATE_DATE_FAILURE: 'react-visual-calendar/calendar/UPDATE_DATE_FAILURE',
    UPDATE_DATE_REQUEST: 'react-visual-calendar/calendar/UPDATE_DATE_REQUEST',

    DELETE_DATE_SUCCESS: 'react-visual-calendar/calendar/DELETE_DATE_SUCCESS',
    DELETE_DATE_FAILURE: 'react-visual-calendar/calendar/DELETE_DATE_FAILURE',
    DELETE_DATE_REQUEST: 'react-visual-calendar/calendar/DELETE_DATE_REQUEST',

    LOAD_DATEICON_SUCCESS: 'react-visual-calendar/calendar/LOAD_DATEICON_SUCCESS',
    LOAD_DATEICON_FAILURE: 'react-visual-calendar/calendar/LOAD_DATEICON_FAILURE',
    LOAD_DATEICON_REQUEST: 'react-visual-calendar/calendar/LOAD_DATEICON_REQUEST',

    UPDATE_DATEICON_SUCCESS: 'react-visual-calendar/calendar/UPDATE_DATEICON_SUCCESS',
    UPDATE_DATEICON_FAILURE: 'react-visual-calendar/calendar/UPDATE_DATEICON_FAILURE',
    UPDATE_DATEICON_REQUEST: 'react-visual-calendar/calendar/UPDATE_DATEICON_REQUEST'
};

// reducer

export function reducer(state = initialState.calendar, action) {
    switch (action.type) {
        case actions.LOAD_CALENDAR_SUCCESS:
            return action.calendar;
        
        case actions.LOAD_CALENDAR_FAILURE:
            return {}; // TODO more here?

        case actions.LOAD_DATE_RANGE_SUCCESS:
            return { 
                ...state,
                date: [...(state.date), [...action.dates]]
            };

        case actions.LOAD_DATE_RANGE_FAILURE:
            return {}; // TODO more here?

        case actions.INSERT_DATE_SUCCESS:
            return  {
                ...state,
                date: [
                    ...(state.date),
                    {...action.date}
                ]
            };

        case actions.INSERT_DATE_FAILURE:
            return {}; // TODO more here?

        case actions.UPDATE_DATE_SUCCESS:
            return { 
                ...state,
                date: [
                    ...(state.date).filter(date => date.id !== action.date.id),
                    {...action.date}
                ]
            };

        case actions.UPDATE_DATE_FAILURE:
            return {}; // TODO more here?

        case actions.DELETE_DATE_SUCCESS:
            return {
                ...state,
                date: [
                    ...(state.date).filter(date => date.id !== action.date_id)
                ]
            };

        case actions.DELETE_DATE_FAILURE:
            return {}; // TODO more here?

        case actions.LOAD_DATEICON_SUCCESS:
            return { 
                ...state,
                date: [
                    ...(state.date).filter(date => date.id !== action.date_id),
                    {
                        ...(state.date).filter(date => date.id === action.date_id),
                        icon: {...action.icon}
                    }
                ]
            };

        case actions.LOAD_DATEICON_FAILURE:
            return {}; // TODO more here?

        case actions.UPDATE_DATEICON_SUCCESS:
            return { 
                ...state,
                date: [
                    ...(state.date).filter(date => date.id !== action.date_id),
                    {
                        ...(state.date).filter(date => date.id === action.date_id),
                        icon: {...action.icon}
                    }
                ]
            };

        case actions.UPDATE_DATEICON_FAILURE:
            return {}; // TODO more here?

        default:
            return state;
    }
}

// sagas

export const sagas = {
    watchers: {
        LOAD_CALENDAR_REQUEST: function* () {
            yield takeEvery(actions.LOAD_CALENDAR_REQUEST, sagas.workers.loadCalendar);
        },
        LOAD_DATE_RANGE_REQUEST: function* () {
            yield takeEvery(actions.LOAD_DATE_REQUEST, sagas.workers.loadDate);
        },
        INSERT_DATE_REQUEST: function* () {
            yield takeEvery(actions.INSERT_DATE_REQUEST, sagas.workers.insertDate);
        },
        UPDATE_DATE_REQUEST: function* () {
            yield takeEvery(actions.UPDATE_DATE_REQUEST, sagas.workers.updateDate);
        },
        DELETE_DATE_REQUEST: function* () {
            yield takeEvery(actions.DELETE_DATE_REQUEST, sagas.workers.deleteDate);
        },
        LOAD_DATEICON_REQUEST: function* () {
            yield takeEvery(actions.LOAD_DATEICON_REQUEST, sagas.workers.loadDateIcon);
        },
        UPDATE_DATEICON_REQUEST: function* () {
            yield takeEvery(actions.UPDATE_DATEICON_REQUEST, sagas.workers.updateDateIcon);
        }
    },
    workers: {
        loadCalendar: function* () {
            try {
                yield put(ajax.creators.ajaxRequest());
                const calendar = yield call(CalendarApi.loadCalendar);
                yield put(creators.loadCalendarSuccess(calendar));
            }
            catch (e) {
                yield put(ajax.creators.ajaxError(e));
            }

        },
        loadDateRange: function* (startDate, endDate) {
            try {
                yield put(ajax.creators.ajaxRequest());
                const dates = yield call(CalendarApi.loadDateRange, startDate, endDate);
                yield put(creators.loadDateRangeSuccess(dates));
            }
            catch (e) {
                yield put(ajax.creators.ajaxError(e));
            }
        },
        insertDate: function* (date) {
            try {
                yield put(ajax.creators.ajaxRequest());
                const dateRet = yield call(CalendarApi.insertDate, date);
                yield put(creators.insertDateSuccess(dateRet));
            }
            catch (e) {
                yield put(ajax.creators.ajaxError(e));
            }
        },
        updateDate: function* (date) {
            try {
                yield put(ajax.creators.ajaxRequest());
                const dateRet = yield call(CalendarApi.updateDate, date);
                yield put(creators.updateDateSuccess(dateRet));
            }
            catch (e) {
                yield put(ajax.creators.ajaxError(e));
            }
        },
        deleteDate: function* (dateId) {
            try {
                yield put(ajax.creators.ajaxRequest());
                const dateIdRet = yield call(CalendarApi.deleteDate, dateId);
                yield put(creators.deleteDateSuccess(dateIdRet));
            }
            catch (e) {
                yield put(ajax.creators.ajaxError(e));
            }
        },
        loadDateIcon: function* (dateId) {
            try {
                yield put(ajax.creators.ajaxRequest());
                const icon = yield call(CalendarApi.loadDateIcon, dateId);
                yield put(creators.loadDateIconSuccess(icon, dateId));
            }
            catch (e) {
                yield put(ajax.creators.ajaxError(e));
            }
        },
        updateDateIcon: function* (icon, dateId) {
            try {
                yield put(ajax.creators.ajaxRequest());
                const iconRet = yield call(CalendarApi.updateDateIcon, icon, dateId);
                yield put(creators.updateDateIconSuccess(iconRet, dateId));
            }
            catch (e) {
                yield put(ajax.creators.ajaxError(e));
            }
        }
    }
};

// action creators

export const creators = {

    loadCalendarSuccess: (calendar) => {
        return { type: actions.LOAD_CALENDAR_SUCCESS, calendar };
    },

    loadCalendarFailure: (error) => {
        return { type: actions.LOAD_CALENDAR_FAILURE, error };
    },

    loadCalendarRequest: () => {
        return { type: actions.LOAD_CALENDAR_REQUEST };
    },

    loadDateRangeSuccess: (dates) => {
        return { type: actions.LOAD_DATE_RANGE_SUCCESS, dates };
    },

    loadDateRangeFailure: (error) => {
        return { type: actions.LOAD_DATE_RANGE_FAILURE, error };
    },

    loadDateRangeRequest: (pastDetent, futureDetent) => {
        return { type: actions.LOAD_DATE_RANGE_REQUEST, pastDetent, futureDetent };
    },
    
    insertDateSuccess: (date) => {
        return { type: actions.INSERT_DATE_SUCCESS, date };
    },

    insertDateFailure: (error) => {
        return { type: actions.INSERT_DATE_FAILURE, error };
    },

    insertDateRequest: (date) => {
        return { type: actions.INSERT_DATE_REQUEST, date };
    },

    updateDateSuccess: (date) => {
        return { type: actions.UPDATE_DATE_SUCCESS, date };
    },

    updateDateFailure: (error) => {
        return { type: actions.UPDATE_DATE_FAILURE, error };
    },

    updateDateRequest: (date) => {
        return { type: actions.UPDATE_DATE_REQUEST, date };
    },

    deleteDateSuccess: (dateId) => {
        return { type: actions.DELETE_DATE_SUCCESS, dateId };
    },

    deleteDateFailure: (error) => {
        return { type: actions.DELETE_DATE_FAILURE, error };
    },

    deleteDateRequest: (dateId) => {
        return { type: actions.DELETE_DATE_REQUEST, dateId };
    },

    loadDateIconSuccess: (icon, dateId) => {
        return { type: actions.LOAD_DATE_ICON_SUCCESS, icon, dateId };
    },

    loadDateIconFailure: (error) => {
        return { type: actions.LOAD_DATE_ICON_FAILURE, error };
    },

    loadDateIconRequest: (icon, dateId) => {
        return { type: actions.LOAD_DATE_ICON_REQUEST, icon, dateId };
    },

    updateDateIconSuccess: (icon, dateId) => {
        return { type: actions.UPDATE_DATE_ICON_SUCCESS, icon, dateId };
    },

    updateDateIconFailure: (error) => {
        return { type: actions.UPDATE_DATE_ICON_FAILURE, error };
    },

    updateDateIconRequest: (icon, dateId) => {
        return { type: actions.UPDATE_DATE_ICON_REQUEST, icon, dateId };
    }
};