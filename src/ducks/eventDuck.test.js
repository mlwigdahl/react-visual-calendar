import { testSaga, expectSaga } from 'redux-saga-test-plan';

import { creators as asyncCreators } from './asyncDuck';
import { creators as dateCreators, reducer as dateReducer } from './dateDuck';
import { creators as calendarCreators, reducer as calendarReducer } from './calendarDuck';
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

describe('Event Duck', () => {
    describe('action creators', () => {
        describe('insertEventRequest()', () => {
            it ('should take three valid parameters and return a valid INSERT_EVENT_REQUEST object', () => {
                const evt = {
                    icon: 'scissors.jpg',
                    label: 'Haircut',
                    startTime: '08:15 AM',
                    endTime: '10:15 AM',
                    endDate: '20170101',
                };
                const action = event.creators.insertEventRequest(1, evt, 1);
                expect(action.type).toBe(event.actions.INSERT_EVENT_REQUEST);
                expect(action.data.dateId).toBe(1);
                expect(action.data.event).toEqual(evt);
                expect(action.data.userId).toBe(1);
                expect(Object.keys(action.data).length).toBe(3);
            });
        });

        describe('insertEventSuccess()', () => {
            it ('should take two valid parameters and return a valid INSERT_EVENT_SUCCESS object', () => {
                const evt = {
                    icon: 'scissors.jpg',
                    label: 'Haircut',
                    startTime: '08:15 AM',
                    endTime: '10:15 AM',
                    endDate: '20170101',
                };
                const action = event.creators.insertEventSuccess(1, evt);
                expect(action.type).toBe(event.actions.INSERT_EVENT_SUCCESS);
                expect(action.data.event).toEqual(evt);
                expect(action.data.dateId).toBe(1);
                expect(Object.keys(action.data).length).toBe(2);
            });
        });

        describe('insertEventFailure()', () => {
            it ('should take one parameter and return a valid INSERT_EVENT_FAILURE object', () => {
                const action = event.creators.insertEventFailure('oops');
                expect(action.type).toBe(event.actions.INSERT_EVENT_FAILURE);
                expect(action.data.error).toBe('oops');
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('updateEventRequest()', () => {
            it ('should take four parameters and return a valid UPDATE_EVENT_REQUEST object', () => {
                const evt = {
                    icon: 'scissors.jpg',
                    label: 'Haircut',
                    startTime: '08:15 AM',
                    endTime: '10:15 AM',
                    endDate: '20170101',
                };
                const action = event.creators.updateEventRequest(1, 1, evt, 1);
                expect(action.type).toBe(event.actions.UPDATE_EVENT_REQUEST);
                expect(action.data.dateId).toBe(1);
                expect(action.data.eventId).toBe(1);
                expect(action.data.event).toEqual(evt);
                expect(action.data.userId).toBe(1);
                expect(Object.keys(action.data).length).toBe(4);
            });
        });

        describe('updateEventSuccess()', () => {
            it ('should take two parameters and return a valid UPDATE_EVENT_SUCCESS object', () => {
                const evt = {
                    icon: 'scissors.jpg',
                    label: 'Haircut',
                    startTime: '08:15 AM',
                    endTime: '10:15 AM',
                    endDate: '20170101',
                };
                const action = event.creators.updateEventSuccess(1, evt);
                expect(action.type).toBe(event.actions.UPDATE_EVENT_SUCCESS);
                expect(action.data.dateId).toBe(1);
                expect(action.data.event).toEqual(evt);
                expect(Object.keys(action.data).length).toBe(2);
            });
        });

        describe('updateEventFailure()', () => {
            it ('should take one parameter and return a valid UPDATE_EVENT_FAILURE object', () => {
                const action = event.creators.updateEventFailure('oops');
                expect(action.type).toBe(event.actions.UPDATE_EVENT_FAILURE);
                expect(action.data.error).toBe('oops');
                expect(Object.keys(action.data).length).toBe(1);
            });
        });

        describe('deleteEventRequest()', () => {
            it ('should take three parameters and return a valid DELETE_EVENT_REQUEST object', () => {
                const action = event.creators.deleteEventRequest(1, 1, 1);
                expect(action.type).toBe(event.actions.DELETE_EVENT_REQUEST);
                expect(action.data.dateId).toBe(1);
                expect(action.data.eventId).toBe(1);
                expect(action.data.userId).toBe(1);
                expect(Object.keys(action.data).length).toBe(3);
            });
        });

        describe('deleteEventSuccess()', () => {
            it ('should take two parameters and return a valid DELETE_EVENT_SUCCESS object', () => {
                const action = event.creators.deleteEventSuccess(1, 1);
                expect(action.type).toBe(event.actions.DELETE_EVENT_SUCCESS);
                expect(action.data.dateId).toBe(1);
                expect(action.data.eventId).toBe(1);
                expect(Object.keys(action.data).length).toBe(2);
            });
        });

        describe('deleteEventFailure()', () => {
            it ('should take one parameter and return a valid DELETE_EVENT_FAILURE object', () => {
                const action = event.creators.deleteEventFailure('oops');
                expect(action.type).toBe(event.actions.DELETE_EVENT_FAILURE);
                expect(action.data.error).toBe('oops');
                expect(Object.keys(action.data).length).toBe(1);
            });
        });
    });
    describe('saga watchers', () => {
        it ('should have INSERT_EVENT_REQUEST trigger an insert operation', () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            return expectSaga(event.sagas.watchers.INSERT_EVENT_REQUEST)
                .take(event.actions.INSERT_EVENT_REQUEST)
                .dispatch(event.creators.insertEventRequest(1, evt, 1))
                .run({ silenceTimeout: true });
        });
        it ('should have UPDATE_EVENT_REQUEST trigger an update operation', () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            return expectSaga(event.sagas.watchers.UPDATE_EVENT_REQUEST)
                .take(event.actions.UPDATE_EVENT_REQUEST)
                .dispatch(event.creators.updateEventRequest(1, 1, evt, 1))
                .run({ silenceTimeout: true });
        });
        it ('should have DELETE_EVENT_REQUEST trigger a delete operation', () => {
            return expectSaga(event.sagas.watchers.DELETE_EVENT_REQUEST)
                .take(event.actions.DELETE_EVENT_REQUEST)
                .dispatch(event.creators.deleteEventRequest(1, 1, 1))
                .run({ silenceTimeout: true });
        });
    });

    describe('saga workers', () => {
        it('should have insertEvent start an async request and return success', () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            testSaga(event.sagas.workers.insertEvent, event.creators.insertEventRequest(1, evt, 1))
                .next()
                .put(asyncCreators.asyncRequest()) // starts AJAX
                .next()
                .call(EventApi.insertEvent, 1, evt, 1)
                .next(evt)
                .put(event.creators.insertEventSuccess(1, evt))
                .next()
                .call(helpers.getBrowserHistory)
                .next(mockBrowserHistory)
                .call(mockBrowserHistory.push, `/day/1`)
                .next()
                .isDone();
        });
        it('should have updateEvent start an async request and return success', () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',                
            };
            testSaga(event.sagas.workers.updateEvent, event.creators.updateEventRequest(1, 1, evt, 1))
                .next()
                .put(asyncCreators.asyncRequest()) // starts AJAX
                .next()
                .call(EventApi.updateEvent, 1, 1, evt, 1)
                .next(evt)
                .put(event.creators.updateEventSuccess(1, evt))
                .next()
                .call(helpers.getBrowserHistory)
                .next(mockBrowserHistory)
                .call(mockBrowserHistory.push, `/day/1`)
                .next()
                .isDone();
        });
        it('should have deleteEvent start an async request and return success', () => {
            testSaga(event.sagas.workers.deleteEvent, event.creators.deleteEventRequest(1, 1, 1))
                .next()
                .put(asyncCreators.asyncRequest()) // starts AJAX
                .next()
                .call(EventApi.deleteEvent, 1, 1, 1)
                .next(1)
                .put(event.creators.deleteEventSuccess(1, 1))
                .next()
                .isDone();            
        });
    });

    describe('reducer', () => {
        it ('should have LOAD_EVENT_RANGE_SUCCESS update the status', () => {
            const cal = drainGenerator(CalendarApi.loadCalendar(1));
            const dr = drainGenerator(DateApi.loadDateRange('20161231', '20170102', 1));
            const er = drainGenerator(EventApi.loadEventRange(dr, 1));

            const action = calendarCreators.loadCalendarSuccess(cal);

            const newState = { ...initialState, calendar: { ...calendarReducer(initialState.calendar, action) } };

            const action2 = dateCreators.loadDateRangeSuccess(dr, 1);

            const newState2 = { ...newState, dates: { ...dateReducer(newState.dates, action2) } };

            const action3 = event.creators.loadEventRangeSuccess(er, 1);

            const newState3 = { ...newState2, events: { ...event.reducer(newState2.events, action3) } };

            expect(newState3).not.toBeUndefined;
            expect(Object.keys(newState3).length).toBe(3);
            expect(Object.keys(newState3.events).length).toBe(4);
            expect(newState3.events['3'].label).toBe('3:45 meeting 😒😒 (Red conference room)');
            expect(newState3.events['4'].icon).toBe('lunch-icon-url');
        });

        it ("should have LOAD_DATE_RANGE_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = event.creators.loadEventRangeFailure("oops");

            const newState = event.reducer(initialState.events, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toEqual({});
        });

        it ("should have INSERT_EVENT_SUCCESS update the status", () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            const action = event.creators.insertEventSuccess(1, { id: 1, data: evt });

            const newState = event.reducer(initialState.events, action);

            expect(newState).not.toBeUndefined;
            expect(Object.keys(newState).length).toBe(1);
            expect(newState[1].label).toBe('Haircut');
            expect(newState[1]).toEqual(evt);
        });

        it ("should have INSERT_EVENT_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = event.creators.insertEventFailure("oops");

            const newState = event.reducer(initialState.events, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toEqual({});
        });

        it ("should have UPDATE_EVENT_SUCCESS update the status", () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };

            const evt2 = {
                icon: 'scissors.jpg',
                label: 'Haircut!',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };

            const action = event.creators.insertEventSuccess(1, { id: 1, data: evt });

            const newState = event.reducer(initialState.events, action);

            const action2 = event.creators.updateEventSuccess(1, { id: 1, data: evt2 });

            const newState2 = event.reducer(newState, action2);

            expect(newState2).not.toBeUndefined;
            expect(Object.keys(newState2).length).toBe(1);
            expect(newState2[1].label).toBe('Haircut!');
            expect(newState2[1]).toEqual(evt2);
        });

        it ("should have UPDATE_EVENT_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = event.creators.updateEventFailure("oops");

            const newState = event.reducer(initialState.events, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toEqual({});
        });

        it ("should have DELETE_EVENT_SUCCESS update the status", () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };

            const action = event.creators.insertEventSuccess(1, { id: 1, data: evt });

            const newState = event.reducer(initialState.events, action);

            const action2 = event.creators.deleteEventSuccess(1, 1);

            const newState2 = event.reducer(newState, action2);

            expect(newState2).not.toBeUndefined;
            expect(Object.keys(newState2).length).toBe(0);
        });

        it ("should have DELETE_EVENT_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = event.creators.deleteEventFailure("oops");

            const newState = event.reducer(initialState.events, action);

            expect(newState).not.toBeUndefined;
            expect(newState).toEqual({});
        });
    });

});

