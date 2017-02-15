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
            return {...action.calendar};
        
        case actions.LOAD_CALENDAR_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.LOAD_DATE_RANGE_SUCCESS:
        {
            // TODO add new items to existing calendar...
            const newState = {...state};

            const newDates = action.dates.map(item => item.date);
            newState.dateInfo = [...newState.dateInfo.filter(item => !newDates.includes(item.date)), ...action.dates];

            return newState;
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
/*            return  {
                ...state,
                date: [
                    ...(state.date),
                    {...action.date}
                ]
            }; */ // TODO this is wrong
            return state;

        case actions.INSERT_EVENT_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.UPDATE_EVENT_SUCCESS:
/*            return { 
                ...state,
                date: [
                    ...(state.date).filter(date => date.id !== action.date.id),
                    {...action.date}
                ]
            }; */ // TODO this is wrong
            return state;

        case actions.UPDATE_EVENT_FAILURE:
            return state; // TODO more here?  Probably update global message...

        case actions.DELETE_EVENT_SUCCESS:
        {
            const deletedDates = state.dateInfo.filter(date => date.id == action.dateId);
            if (deletedDates.length == 1) {
                let deletedDate = { ...deletedDates[0] };
                deletedDate.events.splice(deletedDate.events.findIndex(event => event.id == action.eventId), 1);

                return {
                    ...state,
                    dateInfo: [
                        ...state.dateInfo.filter(date => date.id !== action.dateId),
                        deletedDate,
                    ]
                };
            }
            else {
                return state;
            }
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
        loadDateRange: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dates = yield call(CalendarApi.loadDateRange, action.startDate, action.endDate, action.userId);
                yield put(creators.loadDateRangeSuccess(dates, action.userId));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        insertDate: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dateRet = yield call(CalendarApi.insertDate, action.date, action.userId);
                yield put(creators.insertDateSuccess(dateRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        updateDate: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dateRet = yield call(CalendarApi.updateDate, action.date, action.userId);
                yield put(creators.updateDateSuccess(dateRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        deleteDate: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const dateIdRet = yield call(CalendarApi.deleteDate, action.dateId, action.userId);
                yield put(creators.deleteDateSuccess(dateIdRet));
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
                const eventRet = yield call(CalendarApi.insertEvent, action.date, action.event, action.userId);
                yield put(creators.insertEventSuccess(eventRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        updateEvent: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const eventRet = yield call(CalendarApi.updateEvent, action.date, action.event, action.userId);
                yield put(creators.updateEventSuccess(eventRet));
            }
            catch (e) {
                yield put(async.creators.asyncError(e));
            }
        },
        deleteEvent: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const { dateId: dateIdRet, eventId: eventIdRet } = yield call(CalendarApi.deleteEvent, action.dateId, action.eventId, action.userId);
                yield put(creators.deleteEventSuccess(dateIdRet, eventIdRet));
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

    insertEventSuccess: (event) => {
        return { type: actions.INSERT_EVENT_SUCCESS, event };
    },

    insertEventFailure: (error) => {
        return { type: actions.INSERT_EVENT_FAILURE, error };
    },

    insertEventRequest: (dateId, event, userId) => {
        return { type: actions.INSERT_EVENT_REQUEST, dateId, event, userId };
    },

    updateEventSuccess: (event) => {
        return { type: actions.UPDATE_EVENT_SUCCESS, event };
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