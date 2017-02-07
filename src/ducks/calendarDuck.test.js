
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
            const dr = testhelpers.drainGenerator(CalendarApi.loadDateRange('20161231', '20170101', 1));

            const saga = testSaga(calendar.sagas.workers.loadDateRange, calendar.creators.loadDateRangeRequest('20161231', '20170101', 1));
            return saga
                .next()
                .put(async.creators.asyncRequest()) // starts AJAX
                .next()
                .call(CalendarApi.loadDateRange, '20161231', '20170101', 1)
                .next(dr)
                .put(calendar.creators.loadDateRangeSuccess(dr))
                .next()
                .isDone();
        });
    });
/*
    describe('reducers', () => {

    });
*/

});

