
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
        describe('loadCalendarRequest()', () => {
            it ('should take one parameter and return a valid LOAD_CALENDAR_REQUEST object', () => {
                const action = calendar.creators.loadCalendarRequest(1);
                expect(action.type).toBe(calendar.actions.LOAD_CALENDAR_REQUEST);
                expect(action.data.userId).toBe(1);
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('loadCalendarSuccess()', () => {
            it ('should take one parameter and return a valid LOAD_CALENDAR_SUCCESS object', () => {
                const cal = { cal: 'cal' };
                const action = calendar.creators.loadCalendarSuccess(cal);
                expect(action.type).toBe(calendar.actions.LOAD_CALENDAR_SUCCESS);
                expect(action.data.calendar).toBe(cal);
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('loadCalendarFailure()', () => {
            it ('should take one parameter and return a valid LOAD_CALENDAR_FAILURE object', () => {
                const action = calendar.creators.loadCalendarFailure('oops');
                expect(action.type).toBe(calendar.actions.LOAD_CALENDAR_FAILURE);
                expect(action.data.error).toBe('oops');
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('loadDateIconRequest()', () => {
            it ('should take two parameters and return a valid LOAD_DATE_ICON_REQUEST object', () => {
                const action = calendar.creators.loadDateIconRequest(2, 3);
                expect(action.type).toBe(calendar.actions.LOAD_DATEICON_REQUEST);
                expect(action.data.dateId).toBe(2);
                expect(action.data.userId).toBe(3);
                expect(Object.keys(action.data).length).toBe(2);
            });
        });

        describe('loadDateIconSuccess()', () => {
            it ('should take two parameters and return a valid LOAD_DATE_ICON_SUCCESS object', () => {
                const action = calendar.creators.loadDateIconSuccess('icon', 1);
                expect(action.type).toBe(calendar.actions.LOAD_DATEICON_SUCCESS);
                expect(action.data.icon).toBe('icon');
                expect(action.data.dateId).toBe(1);
                expect(Object.keys(action.data).length).toBe(2);
            });
        });

        describe('loadDateIconFailure()', () => {
            it ('should take one parameter and return a valid LOAD_DATE_ICON_FAILURE object', () => {
                const action = calendar.creators.loadDateIconFailure('oops');
                expect(action.type).toBe(calendar.actions.LOAD_DATEICON_FAILURE);
                expect(action.data.error).toBe('oops');
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('updateDateIconRequest()', () => {
            it ('should take three parameters and return a valid UPDATE_DATE_ICON_REQUEST object', () => {
                const action = calendar.creators.updateDateIconRequest('icon', 2, 3);
                expect(action.type).toBe(calendar.actions.UPDATE_DATEICON_REQUEST);
                expect(action.data.icon).toBe('icon');
                expect(action.data.dateId).toBe(2);
                expect(action.data.userId).toBe(3);
                expect(Object.keys(action.data).length).toBe(3);
            });
        });

        describe('updateDateIconSuccess()', () => {
            it ('should take two parameters and return a valid UPDATE_DATE_ICON_SUCCESS object', () => {
                const action = calendar.creators.updateDateIconSuccess('icon', 1);
                expect(action.type).toBe(calendar.actions.UPDATE_DATEICON_SUCCESS);
                expect(action.data.icon).toBe('icon');
                expect(action.data.dateId).toBe(1);
                expect(Object.keys(action.data).length).toBe(2);
            });
        });

        describe('updateDateIconFailure()', () => {
            it ('should take one parameter and return a valid UPDATE_DATE_ICON_FAILURE object', () => {
                const action = calendar.creators.updateDateIconFailure('oops');
                expect(action.type).toBe(calendar.actions.UPDATE_DATEICON_FAILURE);
                expect(action.data.error).toBe('oops');
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('pushDates()', () => {
            it ('should take two parameters and return a valid PUSH_DATES object', () => {
                const action = calendar.creators.pushDates('1/1/2017', '3/1/2017');
                expect(action.type).toBe(calendar.actions.PUSH_DATES);
                expect(action.data.minDate).toBe('1/1/2017');
                expect(action.data.maxDate).toBe('3/1/2017');
                expect(Object.keys(action.data).length).toBe(2);
            });
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

        it ('should have LOAD_DATEICON_REQUEST pick up multiple requests', () => {
            return expectSaga(calendar.sagas.watchers.LOAD_DATEICON_REQUEST)
                .take(calendar.actions.LOAD_DATEICON_REQUEST)
                .take(calendar.actions.LOAD_DATEICON_REQUEST)
                .dispatch(calendar.creators.loadDateIconRequest(1))
                .dispatch(calendar.creators.loadDateIconRequest(2))
                .run({ silenceTimeout: true });
        });

        it ('should have UPDATE_DATEICON_REQUEST pick up multiple requests', () => {
            return expectSaga(calendar.sagas.watchers.UPDATE_DATEICON_REQUEST)
                .take(calendar.actions.UPDATE_DATEICON_REQUEST)
                .take(calendar.actions.UPDATE_DATEICON_REQUEST)
                .dispatch(calendar.creators.updateDateIconRequest(1))
                .dispatch(calendar.creators.updateDateIconRequest(2))
                .run({ silenceTimeout: true });
        });

    });


    describe('saga workers', () => {
        it('should have loadCalendar start an async request, return success, and push URL', () => {
            const cal = drainGenerator(CalendarApi.loadCalendar(1));
            const dr = drainGenerator(DateApi.loadDateRange('20161231', '20170102', 0));
            const er = drainGenerator(EventApi.loadEventRange(dr, 1));

            testSaga(calendar.sagas.workers.loadCalendar, calendar.creators.loadCalendarRequest(1))
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
                .put(calendar.creators.pushDates(cal.minDate, cal.maxDate))
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

            expect(newState).not.toBeUndefined;
            expect(newState.minDate).toBe('20161002');
        }); 

        it("should have LOAD_CALENDAR_FAILURE update the state (although it doesn't actually do anything at the moment)", () => {
            const action = calendar.creators.loadCalendarFailure("oops");
            
            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toEqual({});
        });

        it("should have LOAD_DATEICON_SUCCESS update the state (although it doesn't actually do anything at the moment)", () => {
            const action = calendar.creators.loadDateIconSuccess('icon', 2);

            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toBe(initialState.calendar);
        });

        it("should have LOAD_DATEICON_FAILURE update the state (although it doesn't actually do anything at the moment)", () => {
            const action = calendar.creators.loadDateIconFailure('oops');

            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toBe(initialState.calendar);
        });

        it("should have UPDATE_DATEICON_SUCCESS update the state (although it doesn't actually do anything at the moment)", () => {
            const action = calendar.creators.updateDateIconSuccess('icon', 2);

            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toBe(initialState.calendar);
        });

        it("should have UPDATE_DATEICON_FAILURE update the state (although it doesn't actually do anything at the moment)", () => {
            const action = calendar.creators.updateDateIconFailure('oops');

            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toBe(initialState.calendar);
        });

        it("should have PUSH_DATES return the state when the date range isn't increased", () => {
            const action = calendar.creators.pushDates('20170102', '20170228');
            const state = { ...initialState };
            state.calendar.minDate = '20170101';
            state.calendar.maxDate = '20170301';

            const newState = calendar.reducer(state.calendar, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toBe(state.calendar);
        });

        it("should have PUSH_DATES update the minimum date when it is moved earlier", () => {
            const action = calendar.creators.pushDates('20161230', '20170228');
            const state = { ...initialState };
            state.calendar.minDate = '20170101';
            state.calendar.maxDate = '20170301';

            const newState = calendar.reducer(state.calendar, action);

            expect(newState).not.toBeUndefined;
            expect(newState.minDate).toBe('20161230');
            expect(newState.maxDate).toBe('20170301');
        });

        it("should have PUSH_DATES update the maximum date when it is moved earlier", () => {
            const action = calendar.creators.pushDates('20170102', '20170302');
            const state = { ...initialState };
            state.calendar.minDate = '20170101';
            state.calendar.maxDate = '20170301';

            const newState = calendar.reducer(state.calendar, action);

            expect(newState).not.toBeUndefined;
            expect(newState.minDate).toBe('20170101');
            expect(newState.maxDate).toBe('20170302');
        });

        it("should have PUSH_DATES update both dates when they are both moved earlier", () => {
            const action = calendar.creators.pushDates('20161230', '20170302');
            const state = { ...initialState };
            state.calendar.minDate = '20170101';
            state.calendar.maxDate = '20170301';

            const newState = calendar.reducer(state.calendar, action);

            expect(newState).not.toBeUndefined;
            expect(newState.minDate).toBe('20161230');
            expect(newState.maxDate).toBe('20170302');
        });

        it('should return existing state when unrecognized action is received', () => {
            const action = { type: 'WHATEVER', data: { test: 'test' } };

            const newState = calendar.reducer(initialState.calendar, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toBe(initialState.calendar);
        });
    });

    describe('selectors', () => {
        describe('getRange()', () => {
            it('should retrieve the min and max dates given the state', () => {
                const state = { ...initialState };
                state.calendar.minDate = '20170101';
                state.calendar.maxDate = '20170301';

                const obj = calendar.selectors.getRange(state);
                expect(obj.minDate).toBe('20170101');
                expect(obj.maxDate).toBe('20170301');
                expect(Object.keys(obj).length).toBe(2);
            });
        });
    });
});

