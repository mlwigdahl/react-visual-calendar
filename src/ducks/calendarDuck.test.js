
import { expect } from 'chai';

import { testSaga, expectSaga } from 'redux-saga-test-plan';

import * as async from './asyncDuck';
import * as calendar from './calendarDuck';
import CalendarApi from '../api/mockCalendarApi';
// import CalendarApi from '../api/CalendarApi'; // when we have a real API to test...
import * as testhelpers from '../common/TestHelpers';
import * as helpers from '../common/Helpers';

// setup

const mockBrowserHistory = { push: () => {} }; // mock browserHistory

// setup

const initialState = {
    calendar: {},
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

        it ('should have LOAD_DATE_RANGE_REQUEST pick up multiple requests', () => {
            return expectSaga(calendar.sagas.watchers.LOAD_DATE_RANGE_REQUEST)
                .take(calendar.actions.LOAD_DATE_RANGE_REQUEST)
                .take(calendar.actions.LOAD_DATE_RANGE_REQUEST)
                .dispatch(calendar.creators.loadDateRangeRequest('1/1/2017', '2/1/2017', 1))
                .dispatch(calendar.creators.loadCalendarRequest('12/1/2016', '1/1/2016', 2))
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

        it('should have loadDateRange start an async request and return success', () => {
            const dr = testhelpers.drainGenerator(CalendarApi.loadDateRange('20161231', '20170101', 0));

            const saga = testSaga(calendar.sagas.workers.loadDateRange, calendar.creators.loadDateRangeRequest('20161231', '20170101', 0));
            return saga
                .next()
                .put(async.creators.asyncRequest()) // starts AJAX
                .next()
                .call(CalendarApi.loadDateRange, '20161231', '20170101', 0)
                .next(dr)
                .put(calendar.creators.loadDateRangeSuccess(dr, 0))
                .next()
                .isDone();
        });
    });

    describe('reducer', () => {
        it('should have LOAD_CALENDAR_SUCCESS update the status', () => {
            const cal = testhelpers.drainGenerator(CalendarApi.loadCalendar(1));

            const action = calendar.creators.loadCalendarSuccess(cal);

            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).to.not.be.undefined;
            expect(newState.selectedDate).to.equal('20170101');
        }); 

        it ("should have LOAD_CALENDAR_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = calendar.creators.loadCalendarFailure("oops");
            
            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).to.not.be.undefined;
            expect(newState).to.deep.equal({});
        });

        it ('should have LOAD_DATE_RANGE_SUCCESS update the status', () => {
            const cal = testhelpers.drainGenerator(CalendarApi.loadCalendar(1));
            const dr = testhelpers.drainGenerator(CalendarApi.loadDateRange('20161231', '20170101', 0));

            const action = calendar.creators.loadCalendarSuccess(cal);

            const newState = calendar.reducer(initialState.calendar, action);

            const action2 = calendar.creators.loadDateRangeSuccess(dr, 0);

            const newState2 = calendar.reducer(newState, action2);

            expect(newState2).to.not.be.undefined;
            expect(newState2.dateInfo.length).to.equal(2);
            expect(newState2.dateInfo[0].events.length).to.equal(2); // TODO this assumes ordering, clean up
        });

        it ("should have LOAD_DATE_RANGE_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = calendar.creators.loadDateRangeFailure("oops");

            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).to.not.be.undefined;
            expect(newState).to.deep.equal({});
        });
    });
});

