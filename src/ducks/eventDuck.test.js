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

describe('Event Duck', () => {
    describe('action creators', () => {
        it ('should have insertEventRequest() take three parameters and return a valid INSERT_EVENT_REQUEST object', () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            const action = event.creators.insertEventRequest(1, evt, 1);
            expect(action.type).to.equal(event.actions.INSERT_EVENT_REQUEST);
            expect(action.data.dateId).to.equal(1);
            expect(action.data.event).to.deep.equal(evt);
            expect(action.data.userId).to.equal(1);
            expect(Object.keys(action.data).length).to.equal(3);
        });

        it ('should have insertEventSuccess() take two parameters and return a valid INSERT_EVENT_SUCCESS object', () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            const action = event.creators.insertEventSuccess(1, evt);
            expect(action.type).to.equal(event.actions.INSERT_EVENT_SUCCESS);
            expect(action.data.event).to.deep.equal(evt);
            expect(action.data.dateId).to.equal(1);
            expect(Object.keys(action.data).length).to.equal(2);
        });

        it ('should have insertEventFailure() take one parameter and return a valid INSERT_EVENT_FAILURE object', () => {
            const action = event.creators.insertEventFailure('oops');
            expect(action.type).to.equal(event.actions.INSERT_EVENT_FAILURE);
            expect(action.data.error).to.equal('oops');
            expect(Object.keys(action.data).length).to.equal(1);
        });

        it ('should have updateEventRequest() take four parameters and return a valid UPDATE_EVENT_REQUEST object', () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            const action = event.creators.updateEventRequest(1, 1, evt, 1);
            expect(action.type).to.equal(event.actions.UPDATE_EVENT_REQUEST);
            expect(action.data.dateId).to.equal(1);
            expect(action.data.eventId).to.equal(1);
            expect(action.data.event).to.deep.equal(evt);
            expect(action.data.userId).to.equal(1);
            expect(Object.keys(action.data).length).to.equal(4);
        });

        it ('should have updateEventSuccess() take two parameters and return a valid UPDATE_EVENT_SUCCESS object', () => {
            const evt = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            const action = event.creators.updateEventSuccess(1, evt);
            expect(action.type).to.equal(event.actions.UPDATE_EVENT_SUCCESS);
            expect(action.data.dateId).to.equal(1);
            expect(action.data.event).to.deep.equal(evt);
            expect(Object.keys(action.data).length).to.equal(2);
        });

        it ('should have updateEventFailure() take one parameter and return a valid UPDATE_EVENT_FAILURE object', () => {
            const action = event.creators.updateEventFailure('oops');
            expect(action.type).to.equal(event.actions.UPDATE_EVENT_FAILURE);
            expect(action.data.error).to.equal('oops');
            expect(Object.keys(action.data).length).to.equal(1);
        });

        it ('should have deleteEventRequest() take three parameters and return a valid DELETE_EVENT_REQUEST object', () => {
            const action = event.creators.deleteEventRequest(1, 1, 1);
            expect(action.type).to.equal(event.actions.DELETE_EVENT_REQUEST);
            expect(action.data.dateId).to.equal(1);
            expect(action.data.eventId).to.equal(1);
            expect(action.data.userId).to.equal(1);
            expect(Object.keys(action.data).length).to.equal(3);
        });

        it ('should have deleteEventSuccess() take two parameters and return a valid DELETE_EVENT_SUCCESS object', () => {
            const action = event.creators.deleteEventSuccess(1, 1);
            expect(action.type).to.equal(event.actions.DELETE_EVENT_SUCCESS);
            expect(action.data.dateId).to.equal(1);
            expect(action.data.eventId).to.equal(1);
            expect(Object.keys(action.data).length).to.equal(2);
        });

        it ('should have deleteEventFailure() take one parameter and return a valid DELETE_EVENT_FAILURE object', () => {
            const action = event.creators.deleteEventFailure('oops');
            expect(action.type).to.equal(event.actions.DELETE_EVENT_FAILURE);
            expect(action.data.error).to.equal('oops');
            expect(Object.keys(action.data).length).to.equal(1);
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
            const saga = testSaga(event.sagas.workers.insertEvent, event.creators.insertEventRequest(1, evt, 1));
            return saga
                .next()
                .put(async.creators.asyncRequest()) // starts AJAX
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
            const saga = testSaga(event.sagas.workers.updateEvent, event.creators.updateEventRequest(1, 1, evt, 1));
            return saga
                .next()
                .put(async.creators.asyncRequest()) // starts AJAX
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
            const saga = testSaga(event.sagas.workers.deleteEvent, event.creators.deleteEventRequest(1, 1, 1));
            return saga
                .next()
                .put(async.creators.asyncRequest()) // starts AJAX
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

            const action = calendar.creators.loadCalendarSuccess(cal);

            const newState = { ...initialState, calendar: { ...calendar.reducer(initialState.calendar, action) } };

            const action2 = date.creators.loadDateRangeSuccess(dr, 1);

            const newState2 = { ...newState, dates: { ...date.reducer(newState.dates, action2) } };

            const action3 = event.creators.loadEventRangeSuccess(er, 1);

            const newState3 = { ...newState2, events: { ...event.reducer(newState2.events, action3) } };

            expect(newState3).to.not.be.undefined;
            expect(Object.keys(newState3).length).to.equal(3);
            expect(Object.keys(newState3.events).length).to.equal(4);
            expect(newState3.events['3'].label).to.equal('3:45 meeting 😒😒 (Red conference room)');
            expect(newState3.events['4'].icon).to.equal('lunch-icon-url');
        });

        it ("should have LOAD_DATE_RANGE_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = event.creators.loadEventRangeFailure("oops");

            const newState = event.reducer(initialState.events, action);

            expect(newState).to.not.be.undefined;
            expect(newState).to.deep.equal({});
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

            expect(newState).to.not.be.undefined;
            expect(Object.keys(newState).length).to.equal(1);
            expect(newState[1].label).to.equal('Haircut');
            expect(newState[1]).to.deep.equal(evt);
        });

        it ("should have INSERT_EVENT_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = event.creators.insertEventFailure("oops");

            const newState = event.reducer(initialState.events, action);

            expect(newState).to.not.be.undefined;
            expect(newState).to.deep.equal({});
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

            expect(newState2).to.not.be.undefined;
            expect(Object.keys(newState2).length).to.equal(1);
            expect(newState2[1].label).to.equal('Haircut!');
            expect(newState2[1]).to.deep.equal(evt2);
        });

        it ("should have UPDATE_EVENT_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = event.creators.updateEventFailure("oops");

            const newState = event.reducer(initialState.events, action);

            expect(newState).to.not.be.undefined;
            expect(newState).to.deep.equal({});
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

            expect(newState2).to.not.be.undefined;
            expect(Object.keys(newState2).length).to.equal(0);
        });

        it ("should have DELETE_EVENT_FAILURE update the status (although it doesn't actually do anything at the moment)", () => {
            const action = event.creators.deleteEventFailure("oops");

            const newState = event.reducer(initialState.events, action);

            expect(newState).to.not.be.undefined;
            expect(newState).to.deep.equal({});
        });
    });

});

