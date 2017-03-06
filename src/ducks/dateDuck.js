
import { put, call, takeEvery } from 'redux-saga/effects';

import initialState from './initialState';
import DateApi from '../api/mockDateApi';
import * as async from './asyncDuck';
import { actions as eventActions, sagas as eventSagas} from './eventDuck';
import { actions as calActions } from './calendarDuck';
//import * as helpers from '../common/Helpers';

// actions

export const actions = {
    LOAD_DATE_RANGE_SUCCESS: 'react-visual-calendar/dates/LOAD_DATE_RANGE_SUCCESS',
    LOAD_DATE_RANGE_FAILURE: 'react-visual-calendar/dates/LOAD_DATE_RANGE_FAILURE',
    LOAD_DATE_RANGE_REQUEST: 'react-visual-calendar/dates/LOAD_DATE_RANGE_REQUEST',

    INSERT_DATE_SUCCESS: 'react-visual-calendar/dates/INSERT_DATE_SUCCESS',
    INSERT_DATE_FAILURE: 'react-visual-calendar/dates/INSERT_DATE_FAILURE',
    INSERT_DATE_REQUEST: 'react-visual-calendar/dates/INSERT_DATE_REQUEST',

    UPDATE_DATE_SUCCESS: 'react-visual-calendar/dates/UPDATE_DATE_SUCCESS',
    UPDATE_DATE_FAILURE: 'react-visual-calendar/dates/UPDATE_DATE_FAILURE',
    UPDATE_DATE_REQUEST: 'react-visual-calendar/dates/UPDATE_DATE_REQUEST',

    DELETE_DATE_SUCCESS: 'react-visual-calendar/dates/DELETE_DATE_SUCCESS',
    DELETE_DATE_FAILURE: 'react-visual-calendar/dates/DELETE_DATE_FAILURE',
    DELETE_DATE_REQUEST: 'react-visual-calendar/dates/DELETE_DATE_REQUEST',
};

// reducer

export function reducer(state = initialState.dates, action) {
    switch(action.type) {

        case calActions.LOAD_CALENDAR_SUCCESS:
            return { ...action.data.dates };

        case actions.LOAD_DATE_RANGE_SUCCESS:
        {
            const existing = Object.keys(state);

            const newDates = Object.keys(action.data.dates)
                .filter(key => !existing.includes(key))
                .reduce((acc, key) => { acc[key] = action.data.dates[key]; return acc; }, {});

            return { 
                ...state,
                ...newDates
            };
        }
        case actions.LOAD_DATE_RANGE_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.INSERT_DATE_SUCCESS:
            return {
                ...state,
                [action.data.date.id]: { ...action.data.date.data }
            };

        case actions.INSERT_DATE_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.UPDATE_DATE_SUCCESS:
            return {
                ...state,
                [action.data.date.id]: { ...action.data.date.data }
            };

        case actions.UPDATE_DATE_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.DELETE_DATE_SUCCESS:
        {
            const newState = { ...state };
            delete newState[action.data.eventId];

            return newState;
        }

        case actions.DELETE_DATE_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case eventActions.INSERT_EVENT_SUCCESS:
        {
            const newEvents = [ ...state[action.data.dateId].events ];
            newEvents.push(action.data.event.id);
            const newState = { ...state, [action.data.dateId]: { ...state[action.data.dateId], events: newEvents } };
            
            return newState;
        }

        case eventActions.DELETE_EVENT_SUCCESS:
        {
            const index = state[action.data.dateId].events.findIndex(id => id === action.data.eventId);
            const newEvents = [ ...state[action.data.dateId].events ];
            if (index > -1) {
                newEvents.splice(index, 1);
            }
            const newState = { ...state, [action.data.dateId]: { ...state[action.data.dateId], events: newEvents } };
            return newState;
        }

        default:
            return state;
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
                yield* sagas.helpers.loadDateRange(action.data.startDate, action.data.endDate, action.data.userId);
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        insertDate: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dateRet = yield call(DateApi.insertDate, action.data.dateId, action.data.userId);
                yield put(creators.insertDateSuccess(dateRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        updateDate: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dateRet = yield call(DateApi.updateDate, action.data.date, action.data.userId);
                yield put(creators.updateDateSuccess(dateRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        deleteDate: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dateIdRet = yield call(DateApi.deleteDate, action.data.dateId, action.data.userId);
                yield put(creators.deleteDateSuccess(dateIdRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
    },
    helpers: {
        loadDateRange: function* (startDate, endDate, userId) {
            yield put(async.creators.asyncRequest());
            const dates = yield call(DateApi.loadDateRange, startDate, endDate, userId);
            yield put(creators.loadDateRangeSuccess(dates, userId));
            
            yield* eventSagas.helpers.loadEventRange(dates, userId);
        }
    }
};

// action creators

export const creators = {
    loadDateRangeSuccess: (dates, userId) => {
        return { type: actions.LOAD_DATE_RANGE_SUCCESS, data: { dates, userId } };
    },

    loadDateRangeFailure: (error) => {
        return { type: actions.LOAD_DATE_RANGE_FAILURE, data: { error } };
    },

    loadDateRangeRequest: (startDate, endDate, userId) => {
        return { type: actions.LOAD_DATE_RANGE_REQUEST, data: { startDate, endDate, userId } };
    },
    
    insertDateSuccess: (date) => {
        return { type: actions.INSERT_DATE_SUCCESS, data: { date } };
    },

    insertDateFailure: (error) => {
        return { type: actions.INSERT_DATE_FAILURE, data: { error } };
    },

    insertDateRequest: (dateId, userId) => {
        return { type: actions.INSERT_DATE_REQUEST, data: { dateId, userId } };
    },

    updateDateSuccess: (date) => {
        return { type: actions.UPDATE_DATE_SUCCESS, data: { date } };
    },

    updateDateFailure: (error) => {
        return { type: actions.UPDATE_DATE_FAILURE, data: { error } };
    },

    updateDateRequest: (date, userId) => {
        return { type: actions.UPDATE_DATE_REQUEST, data: { date, userId } };
    },

    deleteDateSuccess: (dateId) => {
        return { type: actions.DELETE_DATE_SUCCESS, data: { dateId } };
    },

    deleteDateFailure: (error) => {
        return { type: actions.DELETE_DATE_FAILURE, data: { error } };
    },

    deleteDateRequest: (dateId, userId) => {
        return { type: actions.DELETE_DATE_REQUEST, data: { dateId, userId } };
    },
};