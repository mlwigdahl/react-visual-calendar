import { put, call, apply, takeEvery } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import initialState from './initialState';
import EventApi from '../api/mockEventApi';
import { actions as calActions } from './calendarDuck';
import * as async from './asyncDuck';

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

        case calActions.LOAD_CALENDAR_SUCCESS:
            return { ...action.data.events };

        case actions.LOAD_EVENT_RANGE_SUCCESS:
        {
            const existing = Object.keys(state);

            const newEvents = Object.keys(action.data.events)
                .filter(key => !existing.includes(key))
                .reduce((acc, key) => { acc[key] = action.data.events[key]; return acc; }, {});

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
                [action.data.event.id]: { ...action.data.event.data }
            };
        }

        case actions.INSERT_EVENT_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.UPDATE_EVENT_SUCCESS:
        {
            return {
                ...state,
                [action.data.event.id]: { ...action.data.event.data }
            };
        }

        case actions.UPDATE_EVENT_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.DELETE_EVENT_SUCCESS:
        {
            const newState = { ...state };
            delete newState[action.data.eventId];

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
                const eventRet = yield call(EventApi.insertEvent, action.data.dateId, action.data.event, action.data.userId);
                yield put(creators.insertEventSuccess(action.data.dateId, eventRet));
                yield apply(browserHistory, browserHistory.push, [`/day/${action.data.dateId}`]);
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        updateEvent: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const eventRet = yield call(EventApi.updateEvent, action.data.dateId, action.data.eventId, action.data.event, action.data.userId);
                yield put(creators.updateEventSuccess(action.data.dateId, eventRet));
                yield apply(browserHistory, browserHistory.push, [`/day/${action.data.dateId}`]);
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        deleteEvent: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const eventIdRet = yield call(EventApi.deleteEvent, action.data.dateId, action.data.eventId, action.data.userId);
                yield put(creators.deleteEventSuccess(action.data.dateId, eventIdRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
    },
    helpers: {
        loadEventRange: function* (dates, userId) {
            yield put(async.creators.asyncRequest());
            const events = yield call(EventApi.loadEventRange, dates, userId);
            yield put(creators.loadEventRangeSuccess(events, userId));            
        }
    }
};

// action creators

export const creators = {
    loadEventRangeSuccess: (events, userId) => {
        return { type: actions.LOAD_EVENT_RANGE_SUCCESS, data: { events, userId } };
    },

    loadEventRangeFailure: (error) => {
        return { type: actions.LOAD_EVENT_RANGE_FAILURE, data: { error } };
    },
/*
    loadEventRangeRequest: (startDate, endDate, userId) => {
        return { type: actions.LOAD_EVENT_RANGE_REQUEST, data: { startDate, endDate, userId } };
    },
*/ // never actually called...
    insertEventSuccess: (dateId, event) => {
        return { type: actions.INSERT_EVENT_SUCCESS, data: { dateId, event } };
    },

    insertEventFailure: (error) => {
        return { type: actions.INSERT_EVENT_FAILURE, data: { error } };
    },

    insertEventRequest: (dateId, event, userId) => {
        return { type: actions.INSERT_EVENT_REQUEST, data: { dateId, event, userId } };
    },

    updateEventSuccess: (dateId, event) => {
        return { type: actions.UPDATE_EVENT_SUCCESS, data: { dateId, event } };
    },

    updateEventFailure: (error) => {
        return { type: actions.UPDATE_EVENT_FAILURE, data: { error } };
    },

    updateEventRequest: (dateId, eventId, event, userId) => {
        return { type: actions.UPDATE_EVENT_REQUEST, data: { dateId, eventId, event, userId } };
    },

    deleteEventSuccess: (dateId, eventId) => {
        return { type: actions.DELETE_EVENT_SUCCESS, data: { dateId, eventId } };
    },

    deleteEventFailure: (error) => {
        return { type: actions.DELETE_EVENT_FAILURE, data: { error } };
    },

    deleteEventRequest: (dateId, eventId, userId) => {
        return { type: actions.DELETE_EVENT_REQUEST, data: { dateId, eventId, userId } };
    },
};