import { put, call, takeEvery } from 'redux-saga/effects';

import * as async from './asyncDuck';
import * as calendar from './calendarDuck';
import AppApi from '../api/mockAppApi';
import initialState from './initialState';

// actions

export const actions = {
    LOGIN_REQUEST: 'react-visual-calendar/app/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'react-visual-calendar/app/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'react-visual-calendar/app/LOGIN_FAILURE',

    SAVE_SCROLL: 'react-visual-calendar/app/SAVE_SCROLL',
    SAVE_WINDOW_RANGE: 'react-visual-calendar/app/SAVE_WINDOW_RANGE'
};

// reducer

export function reducer(state = initialState.app, action) {
    switch (action.type) {
        case actions.LOGIN_SUCCESS:
            return { ...state, user: action.data.user };
        case actions.LOGIN_FAILURE:
        {
            const tempState = { ...state };
            tempState.user.error = action.data.error;
            return tempState;
        }

        case actions.SAVE_SCROLL:
        {
            if (action.data.scrollPos !== state.scrollPos) {
                return { ...state, scrollPos: action.data.scrollPos };
            }
            else {
                return state;
            }
        }

        case actions.SAVE_WINDOW_RANGE:
        {
            if (action.data.top !== state.windowRange.top ||
                action.data.bottom !== state.windowRange.bottom) {
                    return { ...state, windowRange: { top: action.data.top, bottom: action.data.bottom } };
            }
            else {
                return state;
            }
        }

        default: 
            return state;
    }
}

// sagas

export const sagas = {
    watchers: {
        LOGIN_REQUEST: function* () {
            yield takeEvery(actions.LOGIN_REQUEST, sagas.workers.loginRequest);
        },
    },
    workers: {
        loginRequest: function* (action) {
            try {
                yield put(async.creators.asyncRequest());
                const user = yield call(AppApi.loginAttempt, action.data.username, action.data.password);
                yield put(creators.loginSuccess(user));
                yield put(calendar.creators.loadCalendarRequest(user.id));
            }
            catch (e) {
                yield put(creators.loginFailure(e));
            }
        }
    }
};

// action creators

export const creators = {
    loginRequest: (username, password) => {
        return { type: actions.LOGIN_REQUEST, data: { username, password } };
    },
    loginSuccess: (user) => {
        return { type: actions.LOGIN_SUCCESS, data: { user } };
    },
    loginFailure: (error) => {
        return { type: actions.LOGIN_FAILURE, data: { error } };
    },
    saveScroll: (scrollPos) => {
        return { type: actions.SAVE_SCROLL, data: { scrollPos } };
    },
    saveWindowRange: (top, bottom) => {
        return { type: actions.SAVE_WINDOW_RANGE, data: { top, bottom } };
    },
};