// TODO -- need to make sure the saga exceptions are properly cracked into strings...

import { put, call, takeEvery } from 'redux-saga/effects';

import initialState from './initialState';
import CalendarApi from '../api/mockCalendarApi';
import * as async from './asyncDuck';
import * as helpers from '../common/Helpers';

// actions

export const actions = {
    LOAD_CALENDAR_SUCCESS: 'react-visual-calendar/calendar/LOAD_CALENDAR_SUCCESS',
    LOAD_CALENDAR_FAILURE: 'react-visual-calendar/calendar/LOAD_CALENDAR_FAILURE',
    LOAD_CALENDAR_REQUEST: 'react-visual-calendar/calendar/LOAD_CALENDAR_REQUEST',

    LOAD_DATEICON_SUCCESS: 'react-visual-calendar/calendar/LOAD_DATEICON_SUCCESS',
    LOAD_DATEICON_FAILURE: 'react-visual-calendar/calendar/LOAD_DATEICON_FAILURE',
    LOAD_DATEICON_REQUEST: 'react-visual-calendar/calendar/LOAD_DATEICON_REQUEST',

    UPDATE_DATEICON_SUCCESS: 'react-visual-calendar/calendar/UPDATE_DATEICON_SUCCESS',
    UPDATE_DATEICON_FAILURE: 'react-visual-calendar/calendar/UPDATE_DATEICON_FAILURE',
    UPDATE_DATEICON_REQUEST: 'react-visual-calendar/calendar/UPDATE_DATEICON_REQUEST',

    INSERT_EVENT_SUCCESS: 'react-visual-calendar/calendar/INSERT_EVENT_SUCCESS',
    INSERT_EVENT_FAILURE: 'react-visual-calendar/calendar/INSERT_EVENT_FAILURE',
    INSERT_EVENT_REQUEST: 'react-visual-calendar/calendar/INSERT_EVENT_REQUEST',

    UPDATE_EVENT_SUCCESS: 'react-visual-calendar/calendar/UPDATE_EVENT_SUCCESS',
    UPDATE_EVENT_FAILURE: 'react-visual-calendar/calendar/UPDATE_EVENT_FAILURE',
    UPDATE_EVENT_REQUEST: 'react-visual-calendar/calendar/UPDATE_EVENT_REQUEST',

    DELETE_EVENT_SUCCESS: 'react-visual-calendar/calendar/DELETE_EVENT_SUCCESS',
    DELETE_EVENT_FAILURE: 'react-visual-calendar/calendar/DELETE_EVENT_FAILURE',
    DELETE_EVENT_REQUEST: 'react-visual-calendar/calendar/DELETE_EVENT_REQUEST',
};

// reducer

export function reducer(state = initialState.calendar, action) {
    switch (action.type) {
        case actions.LOAD_CALENDAR_SUCCESS:
            return { ...action.calendar };
        
        case actions.LOAD_CALENDAR_FAILURE:
            return state; // TODO more here?  Probably update global message...



        case actions.LOAD_DATEICON_SUCCESS:
/*            return { 
                ...state,
                date: [
                    ...(state.date).filter(date => date.id !== action.date_id),
                    {
                        ...(state.date).filter(date => date.id === action.date_id),
                        icon: {...action.icon}
                    }
                ]
            }; */ // TODO this is wrong
            return state;

        case actions.LOAD_DATEICON_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.UPDATE_DATEICON_SUCCESS:
/*            return { 
                ...state,
                date: [
                    ...(state.date).filter(date => date.id !== action.date_id),
                    {
                        ...(state.date).filter(date => date.id === action.date_id),
                        icon: {...action.icon}
                    }
                ]
            }; */ // TODO this is wrong
            return state;

        case actions.UPDATE_DATEICON_FAILURE:
            return state; // TODO more here?  Probably update global message...

        default:
            return state;

        case actions.INSERT_EVENT_SUCCESS:
        {
            let date = { ...state.dateInfo.find(date => date.id == action.dateId) };
            const event = date.events.find(event => event.id == action.event.id);
            if (event !== undefined) {
                return state; // event already exists
            }

            date.events.push(event);

            return {
                ...state,
                dateInfo: [
                    ...state.dateInfo.filter(date => date.id != action.dateId),
                    date,
                ],
            };
        }

        case actions.INSERT_EVENT_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.UPDATE_EVENT_SUCCESS:
        {
            let date = { ...state.dateInfo.find(date => date.id == action.dateId) };
            let event = date.events.find(event => event.id == action.event.id);
            if (event === undefined) {
                return state; // event doesn't exist, nothing to do.
            }

            event = action.event;

            return {
                ...state,
                dateInfo: [
                    ...state.dateInfo.filter(date => date.id != action.dateId),
                    date,
                ],
            };
        }

        case actions.UPDATE_EVENT_FAILURE:
            return state; // TODO more here?  Probably update global message...

        // TODO START HERE broken due to deep mutation, needs functional composition (dateInfo -> dates, dates helper, date helper, events helper, event helper)
        case actions.DELETE_EVENT_SUCCESS:
        {
            let deletedDate = state.dateInfo.find(date => date.id == action.dateId);
            deletedDate.events.splice(deletedDate.events.findIndex(event => event.id == action.eventId), 1);

            return {
                ...state,
                dateInfo: [
                    ...state.dateInfo.filter(date => date.id !== action.dateId),
                    deletedDate,
                ]
            };         
        }

        case actions.DELETE_EVENT_FAILURE:
            return state; // TODO more here?  Probably update global message...
    }
}

// sagas

export const sagas = {
    watchers: {
        LOAD_CALENDAR_REQUEST: function* () {
            yield takeEvery(actions.LOAD_CALENDAR_REQUEST, sagas.workers.loadCalendar);
        },
        LOAD_DATEICON_REQUEST: function* () {
            yield takeEvery(actions.LOAD_DATEICON_REQUEST, sagas.workers.loadDateIcon);
        },
        UPDATE_DATEICON_REQUEST: function* () {
            yield takeEvery(actions.UPDATE_DATEICON_REQUEST, sagas.workers.updateDateIcon);
        },
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
        loadCalendar: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const calendar = yield call(CalendarApi.loadCalendar, action.userId);
                yield put(creators.loadCalendarSuccess(calendar));
                const bh = yield call(helpers.getBrowserHistory);
                yield call(bh.push, `/`);
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        loadDateIcon: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const icon = yield call(CalendarApi.loadDateIcon, action.dateId, action.userId);
                yield put(creators.loadDateIconSuccess(icon, action.dateId));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        updateDateIcon: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const iconRet = yield call(CalendarApi.updateDateIcon, action.icon, action.dateId, action.userId);
                yield put(creators.updateDateIconSuccess(iconRet, action.dateId));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        insertEvent: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const eventRet = yield call(CalendarApi.insertEvent, action.dateId, action.event, action.userId);
                yield put(creators.insertEventSuccess(action.dateId, eventRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        updateEvent: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const eventRet = yield call(CalendarApi.updateEvent, action.dateId, action.event, action.userId);
                yield put(creators.updateEventSuccess(action.dateId, eventRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        deleteEvent: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const eventIdRet = yield call(CalendarApi.deleteEvent, action.dateId, action.eventId, action.userId);
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

    loadCalendarSuccess: (calendar) => {
        return { type: actions.LOAD_CALENDAR_SUCCESS, calendar };
    },

    loadCalendarFailure: (error) => {
        return { type: actions.LOAD_CALENDAR_FAILURE, error };
    },

    loadCalendarRequest: (userId) => {
        return { type: actions.LOAD_CALENDAR_REQUEST, userId };
    },

    loadDateIconSuccess: (icon, dateId) => {
        return { type: actions.LOAD_DATE_ICON_SUCCESS, icon, dateId };
    },

    loadDateIconFailure: (error) => {
        return { type: actions.LOAD_DATE_ICON_FAILURE, error };
    },

    loadDateIconRequest: (dateId, userId) => {
        return { type: actions.LOAD_DATE_ICON_REQUEST, dateId, userId };
    },

    updateDateIconSuccess: (icon, dateId) => {
        return { type: actions.UPDATE_DATE_ICON_SUCCESS, icon, dateId };
    },

    updateDateIconFailure: (error) => {
        return { type: actions.UPDATE_DATE_ICON_FAILURE, error };
    },

    updateDateIconRequest: (icon, dateId, userId) => {
        return { type: actions.UPDATE_DATE_ICON_REQUEST, icon, dateId, userId };
    },

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

    updateEventRequest: (dateId, event, userId) => {
        return { type: actions.UPDATE_EVENT_REQUEST, dateId, event, userId };
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