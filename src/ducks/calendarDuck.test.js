
import { expect } from 'chai';

import { testSaga, expectSaga } from 'redux-saga-test-plan';

import * as async from './asyncDuck';
import * as calendar from './calendarDuck';
import CalendarApi from '../api/mockCalendarApi';
import * as testhelpers from '../common/TestHelpers';
import * as helpers from '../common/Helpers';

// TODO: deleteEvent testing

// setup

const mockBrowserHistory = { push: () => {} }; // mock browserHistory

const initialState = {
    calendar: {},
    dates: {},
    events: {},
};

// duck tests

describe('Calendar Duck', () => {
    describe('saga watchers', () => {
        it ('should have LOAD_CALENDAR_REQUEST pick up multiple requests', () => {
            return expectSaga(calendar.sagas.watchers.LOAD_CALENDAR_REQUEST)
                .take(calendar.actions.LOAD_CALENDAR_REQUEST)
                .take(calendar.actions.LOAD_CALENDAR_REQUEST)
                .dispatch(calendar.creators.loadCalendarRequest(1))
                .dispatch(calendar.creators.loadCalendarRequest(2))
                .run({ silenceTimeout: true });
        });
    });


    describe('saga workers', () => {
        it('should have loadCalendar start an async request, return success, and push URL', () => {
            const cal = testhelpers.drainGenerator(CalendarApi.loadCalendar(1));

            const saga = testSaga(calendar.sagas.workers.loadCalendar, calendar.creators.loadCalendarRequest(1));
            return saga
                .next()
                .put(async.creators.asyncRequest()) // starts AJAX
                .next()
                .call(CalendarApi.loadCalendar, 1) // calls API
                .next(cal)
                .put(calendar.creators.loadCalendarSuccess(cal))
                .next()
                .call(helpers.getBrowserHistory)
                .next(mockBrowserHistory)
                .call(mockBrowserHistory.push, '/')
                .next()
                .isDone();
        });
    });

    describe('reducer', () => {
        it('should have LOAD_CALENDAR_SUCCESS update the state', () => {
            const cal = testhelpers.drainGenerator(CalendarApi.loadCalendar(1));

            const action = calendar.creators.loadCalendarSuccess(cal);

            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).to.not.be.undefined;
            expect(newState.selectedDate).to.equal('20170101');
        }); 

        it ("should have LOAD_CALENDAR_FAILURE update the state (although it doesn't actually do anything at the moment)", () => {
            const action = calendar.creators.loadCalendarFailure("oops");
            
            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).to.not.be.undefined;
            expect(newState).to.deep.equal({});
        });
    });
});

