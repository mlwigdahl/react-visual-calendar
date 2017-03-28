
import { testSaga, expectSaga } from 'redux-saga-test-plan';

import * as app from './appDuck';
import * as async from './asyncDuck';
import * as calendar from './calendarDuck';
import AppApi from '../api/mockAppApi';
// import AppApi, { target, apiPath, port } from '../api/appApi'; // when we have a real API to test...
import * as testhelpers from '../common/TestHelpers';



// setup

const initialState = {
    app: {
        user: {
            id: undefined,
            name: undefined,
            error: undefined,
        },
        scrollPos: undefined,
        windowRange: {
            top: '1/10/2017',
            bottom: '3/31/2017',
        }
    }
};

// duck tests

describe('App Duck', () => {
    describe('saga watchers', () => {
        it('should pick up multiple login requests', () => {
            return expectSaga(app.sagas.watchers.LOGIN_REQUEST)
                .take(app.actions.LOGIN_REQUEST)
                .take(app.actions.LOGIN_REQUEST)
                .dispatch(app.creators.loginRequest('test', 'pwd'))
                .dispatch(app.creators.loginRequest('test2', 'pwd2'))
                .run({ silenceTimeout: true });
        });
    });

    describe('saga workers', () => {
        it('should start an async request and return proper data on login', () => {
            const user = testhelpers.drainGenerator(AppApi.loginAttempt());

            testSaga(app.sagas.workers.loginRequest, app.creators.loginRequest('test', 'pwd'))
                .next()
                .put(async.creators.asyncRequest()) // starts AJAX
                .next()
                .call(AppApi.loginAttempt, 'test', 'pwd') // calls API
                .next(user)
                .put(app.creators.loginSuccess(user))
                .next()
                .put(calendar.creators.loadCalendarRequest(user.id))
                .next()
                .isDone();
        });

        it('should start an async request and invoke the API with proper parameters', () => {
            return expectSaga(app.sagas.workers.loginRequest, app.creators.loginRequest('test', 'pwd'))
                .put(async.creators.asyncRequest())
                .call(AppApi.loginAttempt, 'test', 'pwd')
                .run({ silenceTimeout: true });
        });
    });

    describe('reducer', () => {
        it('should update the status on login success', () => {
            const user = testhelpers.drainGenerator(AppApi.loginAttempt('asdf', 'asdf'));

            const action = app.creators.loginSuccess(user);

            const newState = app.reducer(initialState.app, action);

            expect(newState.user.id).toBe(1);
            expect(newState.user.name).toBe('Test User');
        }); 

        it ('should update the status on login failure', () => {
            const action = app.creators.loginFailure('nasty API error');

            const newState = app.reducer(initialState.app, action);

            expect(newState.user.id).toBeUndefined;
            expect(newState.user.name).toBeUndefined;
            expect(newState.user.error).toBe('nasty API error');
        });

        it ('should update the status on scroll save', () => {
            const action = app.creators.saveScroll(100);

            const newState = app.reducer(initialState.app, action);

            expect(newState.scrollPos).toBe(100);
        });

        it ('should update the status on save window range', () => {
            const action = app.creators.saveWindowRange('1/1/2017', '10/1/2016');

            const newState = app.reducer(initialState.app, action);

            expect(newState.windowRange.top).toBe('1/1/2017');
            expect(newState.windowRange.bottom).toBe('10/1/2016');
        });

        it ('should leave the status alone if save window range matches existing state', () => {
            const action = app.creators.saveWindowRange(initialState.app.windowRange.top, initialState.app.windowRange.bottom);

            const newState = app.reducer(initialState.app, action);

            expect(newState).toBe(initialState.app);
        });

        it ('should leave the status alone if save scroll value matches existing state', () => {
            const action = app.creators.saveScroll(initialState.app.scrollPos);

            const newState = app.reducer(initialState.app, action);

            expect(newState).toBe(initialState.app);
        });

        it ('should leave the status alone if we get an unrecognized action', () => {
            const action = { type: 'WHATEVER', data: { test: 'test' } };

            const newState = app.reducer(initialState.app, action);

            expect(newState).toBe(initialState.app);
        });
    });

    describe('action creators', () => {
        it('should create a login request when loginRequest is called', () => {
            const action = app.creators.loginRequest('asdf', 'pw');

            expect(action.data.username).toBe('asdf');
            expect(action.data.password).toBe('pw');
        });
    });
});

