import { testSaga, expectSaga } from 'redux-saga-test-plan';

import { creators as asyncCreators } from './asyncDuck';
import * as date from './dateDuck';
import { creators as calendarCreators, reducer as calendarReducer } from './calendarDuck';
import { creators as eventCreators } from './eventDuck';
import DateApi from '../api/mockDateApi';
import CalendarApi from '../api/mockCalendarApi';
import EventApi from '../api/mockEventApi';
import { drainGenerator } from '../common/TestHelpers';

// setup

const initialState = {
    calendar: {},
    dates: {},
    events: {},
};


// duck tests

describe('Date Duck', () => {
    describe('action creators', () => {
        describe('loadDateRangeRequest()', () => {
            it ('should take three parameters and return a valid LOAD_DATE_RANGE_REQUEST object', () => {
                const action = date.creators.loadDateRangeRequest('1/1/2017', '2/1/2017', 1);
                expect(action.type).toBe(date.actions.LOAD_DATE_RANGE_REQUEST);
                expect(action.data.startDate).toBe('1/1/2017');
                expect(action.data.endDate).toBe('2/1/2017');
                expect(action.data.userId).toBe(1);
                expect(Object.keys(action.data).length).toBe(3);
            });
        });

        describe('loadDateRangeSuccess()', () => {
            it ('should take two parameters and return a valid LOAD_DATE_RANGE_SUCCESS object', () => {
                const dates = { '20170101': { events: [1, 2] } };
                const action = date.creators.loadDateRangeSuccess(dates, 1);
                expect(action.type).toBe(date.actions.LOAD_DATE_RANGE_SUCCESS);
                expect(action.data.dates).toEqual(dates);
                expect(action.data.userId).toBe(1);
                expect(Object.keys(action.data).length).toBe(2);
            });
        });

        describe('loadDateRangeFailure()', () => {
            it ('should take three parameters and return a valid LOAD_DATE_RANGE_FAILURE object', () => {
                const action = date.creators.loadDateRangeFailure('oops');
                expect(action.type).toBe(date.actions.LOAD_DATE_RANGE_FAILURE);
                expect(action.data.error).toBe('oops');
                expect(Object.keys(action.data).length).toBe(1);
            });            
        });

        describe('insertDateRequest()', () => {
            it ('should take two parameters and return a valid INSERT_DATE_REQUEST object', () => {
                const action = date.creators.insertDateRequest('20170201', 1);
                expect(action.type).toBe(date.actions.INSERT_DATE_REQUEST);
                expect(action.data.dateId).toBe('20170201');
                expect(action.data.userId).toBe(1);
                expect(Object.keys(action.data).length).toBe(2);
            });
        });

        describe('insertDateSuccess()', () => {
            it ('should take one parameter and return a valid INSERT_DATE_SUCCESS object', () => {
                const action = date.creators.insertDateSuccess({ events: [1, 2] });
                expect(action.type).toBe(date.actions.INSERT_DATE_SUCCESS);
                expect(action.data.date).toEqual({ events: [1, 2] });
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('insertDateFailure()', () => {
            it ('should take one parameter and return a valid INSERT_DATE_FAILURE object', () => {
                const action = date.creators.insertDateFailure('oops');
                expect(action.type).toBe(date.actions.INSERT_DATE_FAILURE);
                expect(action.data.error).toBe('oops');
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('updateDateRequest()', () => {
            it ('should take two parameters and return a valid UPDATE_DATE_REQUEST object', () => {
                const action = date.creators.updateDateRequest({ events: [1, 2] }, 1);
                expect(action.type).toBe(date.actions.UPDATE_DATE_REQUEST);
                expect(action.data.date).toEqual({ events: [1, 2] });
                expect(action.data.userId).toBe(1);
                expect(Object.keys(action.data).length).toBe(2);
            });
        });

        describe('updateDateSuccess()', () => {
            it ('should take one parameter and return a valid UPDATE_DATE_SUCCESS object', () => {
                const action = date.creators.updateDateSuccess({ events: [1, 2] });
                expect(action.type).toBe(date.actions.UPDATE_DATE_SUCCESS);
                expect(action.data.date).toEqual({ events: [1, 2] });
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('updateDateFailure()', () => {
            it ('should take one parameter and return a valid UPDATE_DATE_FAILURE object', () => {
                const action = date.creators.updateDateFailure('oops');
                expect(action.type).toBe(date.actions.UPDATE_DATE_FAILURE);
                expect(action.data.error).toBe('oops');
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('deleteDateRequest()', () => {
            it ('should take two parameters and return a valid DELETE_DATE_REQUEST object', () => {
                const action = date.creators.deleteDateRequest(2, 1);
                expect(action.type).toBe(date.actions.DELETE_DATE_REQUEST);
                expect(action.data.dateId).toBe(2);
                expect(action.data.userId).toBe(1);
                expect(Object.keys(action.data).length).toBe(2);
            });
        });

        describe('deleteDateSuccess()', () => {
            it ('should take one parameter and return a valid DELETE_DATE_SUCCESS object', () => {
                const action = date.creators.deleteDateSuccess(2);
                expect(action.type).toBe(date.actions.DELETE_DATE_SUCCESS);
                expect(action.data.dateId).toBe(2);
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('deleteDateFailure()', () => {
            it ('should take one parameter and return a valid DELETE_DATE_FAILURE object', () => {
                const action = date.creators.deleteDateFailure('oops');
                expect(action.type).toBe(date.actions.DELETE_DATE_FAILURE);
                expect(action.data.error).toBe('oops');
                expect(Object.keys(action.data).length).toBe(1);
            });
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

        it ('should have INSERT_DATE_REQUEST pick up multiple requests', () => {
            return expectSaga(date.sagas.watchers.INSERT_DATE_REQUEST)
                .take(date.actions.INSERT_DATE_REQUEST)
                .take(date.actions.INSERT_DATE_REQUEST)
                .dispatch(date.creators.insertDateRequest('20170201', 1))
                .dispatch(date.creators.insertDateRequest('20170202', 2))
                .run({ silenceTimeout: true });
        });

        it ('should have UPDATE_DATE_REQUEST pick up multiple requests', () => {
            return expectSaga(date.sagas.watchers.UPDATE_DATE_REQUEST)
                .take(date.actions.UPDATE_DATE_REQUEST)
                .take(date.actions.UPDATE_DATE_REQUEST)
                .dispatch(date.creators.updateDateRequest('20170201', 1))
                .dispatch(date.creators.updateDateRequest('20170202', 2))
                .run({ silenceTimeout: true });
        });

        it ('should have DELETE_DATE_REQUEST pick up multiple requests', () => {
            return expectSaga(date.sagas.watchers.DELETE_DATE_REQUEST)
                .take(date.actions.DELETE_DATE_REQUEST)
                .take(date.actions.DELETE_DATE_REQUEST)
                .dispatch(date.creators.deleteDateRequest(2, 1))
                .dispatch(date.creators.deleteDateRequest(2, 2))
                .run({ silenceTimeout: true });
        });
    });

    describe('saga workers', () => {
        it('should have loadDateRange start an async request and return success', () => {
            const dr = drainGenerator(DateApi.loadDateRange('20161231', '20170101', 0));
            const er = drainGenerator(EventApi.loadEventRange(dr, 0));

            testSaga(date.sagas.workers.loadDateRange, date.creators.loadDateRangeRequest('20161231', '20170101', 0))
                .next()
                .put(asyncCreators.asyncRequest()) // starts AJAX
                .next()
                .call(DateApi.loadDateRange, '20161231', '20170101', 0)
                .next(dr)
                .put(date.creators.loadDateRangeSuccess(dr, 0))
                .next()
                .put(calendarCreators.pushDates('20161231', '20170101'))
                .next()
                .put(asyncCreators.asyncRequest())
                .next()
                .call(EventApi.loadEventRange, dr, 0)
                .next(er)
                .put(eventCreators.loadEventRangeSuccess(er, 0))
                .next()
                .isDone();
        });

        it('should have insertDate start an async request and return success', () => {
            const dt = { events: [] };

            testSaga(date.sagas.workers.insertDate, date.creators.insertDateRequest('20170201', 1))
                .next()
                .put(asyncCreators.asyncRequest()) // starts AJAX
                .next()
                .call(DateApi.insertDate, '20170201', 1)
                .next(dt)
                .put(date.creators.insertDateSuccess(dt))
                .next()
                .isDone();
        });

        it('should have updateDate start an async request and return success', () => {
            const dt = { events: [] };

            testSaga(date.sagas.workers.updateDate, date.creators.updateDateRequest({ events: [] }, 1))
                .next()
                .put(asyncCreators.asyncRequest()) // starts AJAX
                .next()
                .call(DateApi.updateDate, { events: [] }, 1)
                .next(dt)
                .put(date.creators.updateDateSuccess(dt))
                .next()
                .isDone();
        });

        it('should have deleteDate start an async request and return success', () => {
            const dt = 1;

            testSaga(date.sagas.workers.deleteDate, date.creators.deleteDateRequest(1, 1))
                .next()
                .put(asyncCreators.asyncRequest()) // starts AJAX
                .next()
                .call(DateApi.deleteDate, 1, 1)
                .next(dt)
                .put(date.creators.deleteDateSuccess(dt))
                .next()
                .isDone();
        });
    });

    describe('reducer', () => {
        it ('should have LOAD_DATE_RANGE_SUCCESS update the status', () => {
            const cal = drainGenerator(CalendarApi.loadCalendar(1));
            const dr = drainGenerator(DateApi.loadDateRange('20161231', '20170102', 1));

            const action = calendarCreators.loadCalendarSuccess(cal);

            const newState = { ...initialState, calendar: { ...calendarReducer(initialState.calendar, action) } };

            const action2 = date.creators.loadDateRangeSuccess(dr, 1);

            const newState2 = { ...newState, dates: { ...date.reducer(newState.dates, action2) } };

            expect(newState2).not.toBeUndefined;
            expect(Object.keys(newState2.dates).length).toBe(3);
            expect(newState2.dates['20170102'].events.length).toBe(2);
        });

        it ("should have LOAD_DATE_RANGE_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = date.creators.loadDateRangeFailure("oops");

            const newState = date.reducer(initialState.dates, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toEqual({});
        });

        it ("should have INSERT_DATE_SUCCESS update the status", () => {
            const dt = {
                events: [],
            };
            const action = date.creators.insertDateSuccess({ id: '20170201', data: dt });

            const newState = date.reducer(initialState.dates, action);

            expect(newState).not.toBeUndefined;
            expect(Object.keys(newState).length).toBe(1);
            expect(Object.keys(newState)[0]).toBe('20170201');
            expect(newState['20170201'].events.length).toBe(0);
        });

        it ("should have INSERT_DATE_FAILURE update the status (although it doesn't actually do anything at the moment", () => {
            const action = date.creators.insertDateFailure("oops");

            const newState = date.reducer(initialState.dates, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toEqual({});
        });

        it ("should have UPDATE_DATE_SUCCESS update the status", () => {
            const dt = {
                events: [],
            };
            const action = date.creators.updateDateSuccess({ id: '20170201', data: dt });

            const newState = date.reducer(initialState.dates, action);

            expect(newState).not.toBeUndefined;
            expect(Object.keys(newState).length).toBe(1);
            expect(Object.keys(newState)[0]).toBe('20170201');
            expect(newState['20170201'].events.length).toBe(0);
        });

        it ("should have UPDATE_DATE_FAILURE update the status (although it doesn't actually do anything at the moment", () => {
            const action = date.creators.updateDateFailure("oops");

            const newState = date.reducer(initialState.dates, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toEqual({});
        });

        it ("should have DELETE_DATE_SUCCESS update the status", () => {
            const dt = {
                events: [],
            };
            const action = date.creators.deleteDateSuccess(1);

            const newState = date.reducer(initialState.dates, action);

            expect(newState).not.toBeUndefined;
            expect(Object.keys(newState).length).toBe(0);
        });

        it ("should have DELETE_DATE_FAILURE update the status (although it doesn't actually do anything at the moment", () => {
            const action = date.creators.deleteDateFailure("oops");

            const newState = date.reducer(initialState.dates, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toEqual({});
        });

        it ('should return an unchanged state for an unrecognized action', () => {
            const action = calendarCreators.loadCalendarFailure('error');

            const newState = date.reducer(initialState.dates, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toBe(initialState.dates);
        });

        it ("should have INSERT_EVENT_SUCCESS update the status", () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };

            const state = {
                dates:  {
                    '20170101': {
                        events: [1],
                    },
                },
                events: {
                    1: {
                        icon: 'test.jpg',
                        label: 'something',
                        startTime: 'xyz',
                        entTime: 'abc',
                        endDate: '20170101',
                    },
                    2: { ...evt },
                }
            }; 

            const action = eventCreators.insertEventSuccess('20170101', { id: 2, data: evt });

            const newState = date.reducer(state.dates, action);

            expect(newState).not.toBeUndefined;
            expect(newState['20170101'].events.length).toBe(2);
            expect(newState['20170101'].events[1]).toBe(2);
        });

        it ("should have DELETE_EVENT_SUCCESS update the status", () => {
            const state = {
                dates:  {
                    '20170101': {
                        events: [1],
                    },
                },
                events: {
                    1: {
                        icon: 'test.jpg',
                        label: 'something',
                        startTime: 'xyz',
                        entTime: 'abc',
                        endDate: '20170101',
                    },
                },
            }; 

            const action = eventCreators.deleteEventSuccess('20170101', 1);

            const newState = date.reducer(state.dates, action);

            expect(newState).not.toBeUndefined;
            expect(newState['20170101'].events.length).toBe(0);
        });
    });
});

