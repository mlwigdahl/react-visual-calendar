import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import initialState from './initialState';
import * as calendar from './calendarDuck';

// actions

export const actions = {
    SET_PAST_DETENT: 'react-visual-calendar/dateRange/SET_PAST_DETENT',
    SET_FUTURE_DETENT: 'react-visual-calendar/dateRange/SET_FUTURE_DETENT',
    SET_SELECTED_DATE: 'react-visual-calendar/dateRange/SET_SELECTED_DATE'
};

// reducer

export function reducer(state = initialState.dateRange, action) {
    switch(action.type) {
        case actions.SET_PAST_DETENT:
            return { ...state, pastDetent: action.date };
        case actions.SET_FUTURE_DETENT:
            return { ...state, futureDetent: action.date };
        case actions.SET_SELECTED_DATE:
            return { ...state, selectedDate: action.date };
        default:
            return state;
    }
}

// sagas

export const sagas = {
    watchers: {
        SET_PAST_DETENT: function* () {
            yield takeEvery(actions.SET_PAST_DETENT, sagas.workers.setPastDetent);
        },
        SET_FUTURE_DETENT: function* () {
            yield takeEvery(actions.SET_FUTURE_DETENT, sagas.workers.setFutureDetent);
        },
        SET_SELECTED_DATE: function* () {
            yield takeEvery(actions.SET_SELECTED_DATE, sagas.workers.setSelectedDate);
        },
    },
    workers: {
        setPastDetent: function* () {
            try {
                let dateRange = yield select(selectors.dateRange);
                yield put(calendar.creators.loadDateRangeRequest(dateRange.pastDetent, dateRange.futureDetent));
            }
            catch (e) {
                // TODO need some kind of reasonable error handling here...
            }
        },
        setFutureDetent: function* () {
            try {
                let dateRange = yield select(selectors.dateRange);
                yield put(calendar.creators.loadDateRangeRequest(dateRange.pastDetent, dateRange.futureDetent));
            }
            catch (e) {
                // TODO need some kind of reasonable error handling here...
            }
        },
/*        setSelectedDate: function* () {
            try {
                // TODO need some specific logic here...
            }
            catch (e) {
                // TODO need some kind of reasonable error handling here...
            }
        } */
    }
};

// action creators

export const creators = {
    setPastDetent: (date) => {
        return { type: actions.SET_PAST_DETENT, date };
    },
    setFutureDetent: (date) => {
        return { type: actions.SET_FUTURE_DETENT, date };
    },
    setSelectedDate: (date) => {
        return { type: actions.SET_SELECTED_DATE, date };
    }
};

// selector

export const selectors = {
    dateRange: state => state.dateRange
};