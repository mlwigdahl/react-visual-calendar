// TODO honestly, this can probably go...

import { put, call, takeEvery } from 'redux-saga/effects';

import initialState from './initialState';
import DateApi from '../api/mockDateApi';
import EventApi from '../api/mockEventApi';
import * as async from './asyncDuck';
import * as helpers from '../common/Helpers';

// actions

export const actions = {
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
};

// reducer

export function reducer(state = initialState.dates, action) {
    switch(action.type) {
        case actions.LOAD_DATE_RANGE_SUCCESS:
        {
            const existing = state.keys();

            const newDates = action.dates
                .keys()
                .filter(key => !existing.includes(key))
                .reduce((acc, key) => { acc[key] = action.dates[key]; return acc; }, {});

            return { 
                ...state,
                ...newDates
            };
        }
        case actions.LOAD_DATE_RANGE_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.INSERT_DATE_SUCCESS:
/*            return  {
                ...state,
                date: [
                    ...(state.date),
                    {...action.date}
                ]
            }; */ // TODO this is wrong
            return state;

        case actions.INSERT_DATE_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.UPDATE_DATE_SUCCESS:
/*            return { 
                ...state,
                date: [
                    ...(state.date).filter(date => date.id !== action.date.id),
                    {...action.date}
                ]
            }; */ // TODO this is wrong
            return state;

        case actions.UPDATE_DATE_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.DELETE_DATE_SUCCESS:
/*            return {
                ...state,
                date: [
                    ...(state.date).filter(date => date.id !== action.date_id)
                ]
            }; */ // TODO this is wrong
            return state;

        case actions.DELETE_DATE_FAILURE:
            return state; // TODO more here?  Probably update global message...
    }
}

// sagas

export const sagas = {
    watchers: {
        LOAD_DATE_RANGE_REQUEST: function* () {
            yield takeEvery(actions.LOAD_DATE_RANGE_REQUEST, sagas.workers.loadDateRange);
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
    },
    workers: {
        loadDateRange: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dates = yield call(DateApi.loadDateRange, action.startDate, action.endDate, action.userId);
                yield put(creators.loadDateRangeSuccess(dates, action.userId));
                const events = yield call(EventApi.loadEventRange, dates, action.userId);
                yield put(creators.loadEventRangeSuccess(events, action.userId));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        insertDate: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dateRet = yield call(DateApi.insertDate, action.date, action.userId);
                yield put(creators.insertDateSuccess(dateRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        updateDate: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dateRet = yield call(DateApi.updateDate, action.date, action.userId);
                yield put(creators.updateDateSuccess(dateRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        deleteDate: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dateIdRet = yield call(DateApi.deleteDate, action.dateId, action.userId);
                yield put(creators.deleteDateSuccess(dateIdRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
    }
};

// action creators

export const creators = {
    loadDateRangeSuccess: (dates, userId) => {
        return { type: actions.LOAD_DATE_RANGE_SUCCESS, dates, userId };
    },

    loadDateRangeFailure: (error) => {
        return { type: actions.LOAD_DATE_RANGE_FAILURE, error };
    },

    loadDateRangeRequest: (startDate, endDate, userId) => {
        return { type: actions.LOAD_DATE_RANGE_REQUEST, startDate, endDate, userId };
    },
    
    insertDateSuccess: (date) => {
        return { type: actions.INSERT_DATE_SUCCESS, date };
    },

    insertDateFailure: (error) => {
        return { type: actions.INSERT_DATE_FAILURE, error };
    },

    insertDateRequest: (date, userId) => {
        return { type: actions.INSERT_DATE_REQUEST, date, userId };
    },

    updateDateSuccess: (date) => {
        return { type: actions.UPDATE_DATE_SUCCESS, date };
    },

    updateDateFailure: (error) => {
        return { type: actions.UPDATE_DATE_FAILURE, error };
    },

    updateDateRequest: (date, userId) => {
        return { type: actions.UPDATE_DATE_REQUEST, date, userId };
    },

    deleteDateSuccess: (dateId) => {
        return { type: actions.DELETE_DATE_SUCCESS, dateId };
    },

    deleteDateFailure: (error) => {
        return { type: actions.DELETE_DATE_FAILURE, error };
    },

    deleteDateRequest: (dateId, userId) => {
        return { type: actions.DELETE_DATE_REQUEST, dateId, userId };
    },
};

// selector

export const selectors = {
    dates: state => state.dates
};