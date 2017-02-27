import { expect } from 'chai';

import { testSaga, expectSaga } from 'redux-saga-test-plan';

import * as async from './asyncDuck';
import * as date from './dateDuck';
import * as calendar from './calendarDuck';
import * as event from './eventDuck';
import DateApi from '../api/mockDateApi';
import CalendarApi from '../api/mockCalendarApi';
import EventApi from '../api/mockEventApi';
import { drainGenerator, mockBrowserHistory } from '../common/TestHelpers';
import * as helpers from '../common/Helpers';

// setup

const initialState = {
    calendar: {},
    dates: {},
    events: {},
};


// duck tests

describe('Date Duck', () => {
    describe('action creators', () => {
        it ('should have loadDateRangeRequest() take three parameters and return a valid LOAD_DATE_RANGE_REQUEST object', () => {
            const action = date.creators.loadDateRangeRequest('1/1/2017', '2/1/2017', 1);
            expect(action.type).to.equal(date.actions.LOAD_DATE_RANGE_REQUEST);
            expect(action.data.startDate).to.equal('1/1/2017');
            expect(action.data.endDate).to.equal('2/1/2017');
            expect(action.data.userId).to.equal(1);
            expect(Object.keys(action.data).length).to.equal(3);
        });

        it ('should have loadDateRangeSuccess() take two parameters and return a valid LOAD_DATE_RANGE_SUCCESS object', () => {
            const dates = { '20170101': { events: [1, 2] } };
            const action = date.creators.loadDateRangeSuccess(dates, 1);
            expect(action.type).to.equal(date.actions.LOAD_DATE_RANGE_SUCCESS);
            expect(action.data.dates).to.deep.equal(dates);
            expect(action.data.userId).to.equal(1);
            expect(Object.keys(action.data).length).to.equal(2);
        });

        it ('should have loadDateRangeFailure() take three parameters and return a valid LOAD_DATE_RANGE_FAILURE object', () => {
            const action = date.creators.loadDateRangeFailure('oops');
            expect(action.type).to.equal(date.actions.LOAD_DATE_RANGE_FAILURE);
            expect(action.data.error).to.equal('oops');
            expect(Object.keys(action.data).length).to.equal(1);
        });
    });

    describe('saga watchers', () => {
        it ('should have LOAD_DATE_RANGE_REQUEST pick up multiple requests', () => {
            return expectSaga(date.sagas.watchers.LOAD_DATE_RANGE_REQUEST)
                .take(date.actions.LOAD_DATE_RANGE_REQUEST)
                .take(date.actions.LOAD_DATE_RANGE_REQUEST)
                .dispatch(date.creators.loadDateRangeRequest('1/1/2017', '2/1/2017', 1))
                .dispatch(date.creators.loadDateRangeRequest('12/1/2016', '1/1/2017', 2))
                .run({ silenceTimeout: true });
        });
    });

    describe('saga workers', () => {
        it('should have loadDateRange start an async request and return success', () => {
            const dr = drainGenerator(DateApi.loadDateRange('20161231', '20170101', 0));
            const er = drainGenerator(EventApi.loadEventRange(dr, 0));

            const saga = testSaga(date.sagas.workers.loadDateRange, date.creators.loadDateRangeRequest('20161231', '20170101', 0));
            return saga
                .next()
                .put(async.creators.asyncRequest()) // starts AJAX
                .next()
                .call(DateApi.loadDateRange, '20161231', '20170101', 0)
                .next(dr)
                .put(date.creators.loadDateRangeSuccess(dr, 0))
                .next()
                .put(async.creators.asyncRequest())
                .next()
                .call(EventApi.loadEventRange, dr, 0)
                .next(er)
                .put(event.creators.loadEventRangeSuccess(er, 0))
                .next()
                .isDone();
        });
    });

    describe('reducer', () => {
        it ('should have LOAD_DATE_RANGE_SUCCESS update the status', () => {
            const cal = drainGenerator(CalendarApi.loadCalendar(1));
            const dr = drainGenerator(DateApi.loadDateRange('20161231', '20170102', 1));

            const action = calendar.creators.loadCalendarSuccess(cal);

            const newState = { ...initialState, calendar: { ...calendar.reducer(initialState.calendar, action) } };

            const action2 = date.creators.loadDateRangeSuccess(dr, 1);

            const newState2 = { ...newState, dates: { ...date.reducer(newState.dates, action2) } };

            expect(newState2).to.not.be.undefined;
            expect(Object.keys(newState2.dates).length).to.equal(3);
            expect(newState2.dates['20170102'].events.length).to.equal(2);
        });

        it ("should have LOAD_DATE_RANGE_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = date.creators.loadDateRangeFailure("oops");

            const newState = date.reducer(initialState.dates, action);

            expect(newState).to.not.be.undefined;
            expect(newState).to.deep.equal({});
        });

        // TODO probably need a test that looks at the event loading as chained from the date range loading also.
    });

});

