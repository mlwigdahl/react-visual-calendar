import { expect } from 'chai';

import { testSaga, expectSaga } from 'redux-saga-test-plan';

import * as async from './asyncDuck';
import * as date from './calendarDuck';
import * as calendar from './calendarDuck';
import DateApi from '../api/mockDateApi';
import CalendarApi from '../api/mockCalendarApi';
import * as testhelpers from '../common/TestHelpers';
import * as helpers from '../common/Helpers';

// setup

const initialState = {
    calendar: {},
    dates: {},
    events: {},
};


// duck tests

describe('Date Duck', () => {
    describe('saga watchers', () => {
        it ('should have LOAD_DATE_RANGE_REQUEST pick up multiple requests', () => {
            return expectSaga(date.sagas.watchers.LOAD_DATE_RANGE_REQUEST)
                .take(date.actions.LOAD_DATE_RANGE_REQUEST)
                .take(date.actions.LOAD_DATE_RANGE_REQUEST)
                .dispatch(date.creators.loadDateRangeRequest('1/1/2017', '2/1/2017', 1))
                .dispatch(calendar.creators.loadCalendarRequest('12/1/2016', '1/1/2016', 2))
                .run({ silenceTimeout: true });
        });
    });

    describe('saga workers', () => {
        it('should have loadDateRange start an async request and return success', () => {
            const dr = testhelpers.drainGenerator(DateApi.loadDateRange('20161231', '20170101', 0));

            const saga = testSaga(date.sagas.workers.loadDateRange, date.creators.loadDateRangeRequest('20161231', '20170101', 0));
            return saga
                .next()
                .put(async.creators.asyncRequest()) // starts AJAX
                .next()
                .call(DateApi.loadDateRange, '20161231', '20170101', 0)
                .next(dr)
                .put(date.creators.loadDateRangeSuccess(dr, 0))
                .next()
                .isDone();
        });
    });

    describe('reducer', () => {
        it ('should have LOAD_DATE_RANGE_SUCCESS update the status', () => {
            const cal = testhelpers.drainGenerator(CalendarApi.loadCalendar(1));
            const dr = testhelpers.drainGenerator(DateApi.loadDateRange('20161231', '20170101', 0));

            const action = calendar.creators.loadCalendarSuccess(cal);

            const newState = calendar.reducer(initialState.calendar, action);

            const action2 = date.creators.loadDateRangeSuccess(dr, 0);

            const newState2 = date.reducer(newState, action2);

            expect(newState2).to.not.be.undefined;
            expect(newState2.dateInfo.length).to.equal(2);
            expect(newState2.dateInfo[0].events.length).to.equal(2); // TODO this assumes ordering, clean up
        });

        it ("should have LOAD_DATE_RANGE_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = date.creators.loadDateRangeFailure("oops");

            const newState = date.reducer(initialState.date, action);

            expect(newState).to.not.be.undefined;
            expect(newState).to.deep.equal({});
        });

        // TODO probably need a test that looks at the event loading also.
    });

});

