import { put, call, takeEvery } from 'redux-saga/effects';

import initialState from './initialState';
import EventApi from '../api/mockEventApi';
import * as calendar from './calendarDuck';
import * as async from './asyncDuck';
import * as helpers from '../common/Helpers';

// actions

export const actions = {
    LOAD_EVENT_RANGE_SUCCESS: 'react-visual-calendar/events/LOAD_EVENT_RANGE_SUCCESS',
    LOAD_EVENT_RANGE_FAILURE: 'react-visual-calendar/events/LOAD_EVENT_RANGE_FAILURE',
    LOAD_EVENT_RANGE_REQUEST: 'react-visual-calendar/events/LOAD_EVENT_RANGE_REQUEST',

    INSERT_EVENT_SUCCESS: 'react-visual-calendar/events/INSERT_EVENT_SUCCESS',
    INSERT_EVENT_FAILURE: 'react-visual-calendar/events/INSERT_EVENT_FAILURE',
    INSERT_EVENT_REQUEST: 'react-visual-calendar/events/INSERT_EVENT_REQUEST',

    UPDATE_EVENT_SUCCESS: 'react-visual-calendar/events/UPDATE_EVENT_SUCCESS',
    UPDATE_EVENT_FAILURE: 'react-visual-calendar/events/UPDATE_EVENT_FAILURE',
    UPDATE_EVENT_REQUEST: 'react-visual-calendar/events/UPDATE_EVENT_REQUEST',

    DELETE_EVENT_SUCCESS: 'react-visual-calendar/events/DELETE_EVENT_SUCCESS',
    DELETE_EVENT_FAILURE: 'react-visual-calendar/events/DELETE_EVENT_FAILURE',
    DELETE_EVENT_REQUEST: 'react-visual-calendar/events/DELETE_EVENT_REQUEST',
};

// reducer

export function reducer(state = initialState.events, action) {
    switch (action.type) {

        case calendar.actions.LOAD_CALENDAR_SUCCESS:
            return { ...action.data.events };

        case actions.LOAD_EVENT_RANGE_SUCCESS:
        {
            const existing = Object.keys(state);

            const newEvents = Object.keys(action.events)
                .filter(key => !existing.includes(key))
                .reduce((acc, key) => { acc[key] = action.events[key]; return acc; }, {});

            return { 
                ...state,
                ...newEvents
            };
        }

        case actions.LOAD_EVENT_RANGE_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.INSERT_EVENT_SUCCESS:
        {
            return {
                ...state,
                [action.event.id]: { ...action.event.event }
            };
        }

        case actions.INSERT_EVENT_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.UPDATE_EVENT_SUCCESS:
        {
            return {
                ...state,
                [action.event.id]: { ...action.event.event }
            };
        }

        case actions.UPDATE_EVENT_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.DELETE_EVENT_SUCCESS:
        {
            const newState = { ...state };
            delete newState[action.eventId];

            return newState;
        }

        case actions.DELETE_EVENT_FAILURE:
            return state; // TODO more here?  Probably update global message...

        default:
            return state;
    }
}

// sagas

export const sagas = {
    watchers: {
        INSERT_EVENT_REQUEST: function* () {
            yield takeEvery(actions.INSERT_EVENT_REQUEST, sagas.workers.insertEvent);
        },
        UPDATE_EVENT_REQUEST: function* () {
            yield takeEvery(actions.UPDATE_EVENT_REQUEST, sagas.workers.updateEvent);
        },
        DELETE_EVENT_REQUEST: function* () {
            yield takeEvery(actions.DELETE_EVENT_REQUEST, sagas.workers.deleteEvent);
        },
    },
    workers: {
        insertEvent: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const eventRet = yield call(EventApi.insertEvent, action.dateId, action.event, action.userId);
                yield put(creators.insertEventSuccess(action.dateId, eventRet));
                const bh = yield call(helpers.getBrowserHistory);
                yield call(bh.push, `/day/${action.dateId}`);
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        updateEvent: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const eventRet = yield call(EventApi.updateEvent, action.dateId, action.eventId, action.event, action.userId);
                yield put(creators.updateEventSuccess(action.dateId, eventRet));
                const bh = yield call(helpers.getBrowserHistory);
                yield call(bh.push, `/day/${action.dateId}`);
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        deleteEvent: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const eventIdRet = yield call(EventApi.deleteEvent, action.dateId, action.eventId, action.userId);
                yield put(creators.deleteEventSuccess(action.dateId, eventIdRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
    }
};

// action creators

export const creators = {
    loadEventRangeSuccess: (events, userId) => {
        return { type: actions.LOAD_EVENT_RANGE_SUCCESS, events, userId };
    },

    loadEventRangeFailure: (error) => {
        return { type: actions.LOAD_EVENT_RANGE_FAILURE, error };
    },
/*
    loadEventRangeRequest: (startDate, endDate, userId) => {
        return { type: actions.LOAD_EVENT_RANGE_REQUEST, startDate, endDate, userId };
    },
*/ // never actually called...
    insertEventSuccess: (dateId, event) => {
        return { type: actions.INSERT_EVENT_SUCCESS, dateId, event };
    },

    insertEventFailure: (error) => {
        return { type: actions.INSERT_EVENT_FAILURE, error };
    },

    insertEventRequest: (dateId, event, userId) => {
        return { type: actions.INSERT_EVENT_REQUEST, dateId, event, userId };
    },

    updateEventSuccess: (dateId, event) => {
        return { type: actions.UPDATE_EVENT_SUCCESS, dateId, event };
    },

    updateEventFailure: (error) => {
        return { type: actions.UPDATE_EVENT_FAILURE, error };
    },

    updateEventRequest: (dateId, eventId, event, userId) => {
        return { type: actions.UPDATE_EVENT_REQUEST, dateId, eventId, event, userId };
    },

    deleteEventSuccess: (dateId, eventId) => {
        return { type: actions.DELETE_EVENT_SUCCESS, dateId, eventId };
    },

    deleteEventFailure: (error) => {
        return { type: actions.DELETE_EVENT_FAILURE, error };
    },

    deleteEventRequest: (dateId, eventId, userId) => {
        return { type: actions.DELETE_EVENT_REQUEST, dateId, eventId, userId };
    },
};