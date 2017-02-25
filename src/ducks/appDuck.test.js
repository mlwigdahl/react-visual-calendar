
import { expect } from 'chai';

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

            const saga = testSaga(app.sagas.workers.loginRequest, app.creators.loginRequest('test', 'pwd'));
            return saga
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

            expect(newState.user.id).to.equal(1);
            expect(newState.user.name).to.equal('Test User');
        }); 

        it ('reducer should update the status on login failure', () => {
            const action = app.creators.loginFailure('nasty API error');

            const newState = app.reducer(initialState.app, action);

            expect(newState.user.id).to.be.undefined;
            expect(newState.user.name).to.be.undefined;
            expect(newState.user.error).to.equal('nasty API error');
        });
    });
});

