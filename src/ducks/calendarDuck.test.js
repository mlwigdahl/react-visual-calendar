
import { expect } from 'chai';

import { testSaga, expectSaga } from 'redux-saga-test-plan';

import * as async from './asyncDuck';
import * as calendar from './calendarDuck';
import * as date from './dateDuck';
import * as event from './eventDuck';
import CalendarApi from '../api/mockCalendarApi';
import DateApi from '../api/mockDateApi';
import EventApi from '../api/mockEventApi';
import { drainGenerator, mockBrowserHistory } from '../common/TestHelpers';
import * as helpers from '../common/Helpers';

// TODO: deleteEvent testing

// setup

const initialState = {
    calendar: {},
    dates: {},
    events: {},
};

// duck tests

describe('Calendar Duck', () => {

    describe('action creators', () => {
        it ('should have loadCalendarRequest() take one parameter and return a valid LOAD_CALENDAR_REQUEST object', () => {
            const action = calendar.creators.loadCalendarRequest(1);
            expect(action.type).to.equal(calendar.actions.LOAD_CALENDAR_REQUEST);
            expect(action.data.userId).to.equal(1);
            expect(Object.keys(action.data).length).to.equal(1);
        });

        it ('should have loadCalendarSuccess() take one parameter and return a valid LOAD_CALENDAR_SUCCESS object', () => {
            const cal = { cal: 'cal' };
            const action = calendar.creators.loadCalendarSuccess(cal);
            expect(action.type).to.equal(calendar.actions.LOAD_CALENDAR_SUCCESS);
            expect(action.data.calendar).to.equal(cal);
            expect(Object.keys(action.data).length).to.equal(1);
        });

        it ('should have loadCalendarFailure() take one parameter and return a valid LOAD_CALENDAR_FAILURE object', () => {
            const action = calendar.creators.loadCalendarFailure('oops');
            expect(action.type).to.equal(calendar.actions.LOAD_CALENDAR_FAILURE);
            expect(action.data.error).to.equal('oops');
            expect(Object.keys(action.data).length).to.equal(1);
        });
    });

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
            const cal = drainGenerator(CalendarApi.loadCalendar(1));
            const dr = drainGenerator(DateApi.loadDateRange('20161231', '20170102', 0));
            const er = drainGenerator(EventApi.loadEventRange(dr, 1));

            const saga = testSaga(calendar.sagas.workers.loadCalendar, calendar.creators.loadCalendarRequest(1));
            return saga
                .next()
                .put(async.creators.asyncRequest()) // starts AJAX
                .next()
                .call(CalendarApi.loadCalendar, 1) // calls API
                .next(cal)
                .put(calendar.creators.loadCalendarSuccess(cal))
                .next()
                .put(async.creators.asyncRequest())
                .next()
                .call(DateApi.loadDateRange, cal.minDate, cal.maxDate, 1)
                .next(dr)
                .put(date.creators.loadDateRangeSuccess(dr, 1))
                .next()
                .put(async.creators.asyncRequest())
                .next()
                .call(EventApi.loadEventRange, dr, 1)
                .next(er)
                .put(event.creators.loadEventRangeSuccess(er, 1))
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
            const cal = drainGenerator(CalendarApi.loadCalendar(1));

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

