
import { expect } from 'chai';

import { drainGenerator } from '../common/TestHelpers';

import EventApi from './mockEventApi';

describe('Event Api', () => {
    describe('loadEventRange()', () => {
        it('should retrieve correctly-formatted data', () => {
            const eventsNew = {
                1: {
                    icon: 'scissors.jpg',
                    label: 'Haircut',
                    startTime: '08:15 AM',
                    endTime: '10:15 AM',
                    endDate: '20170101',
                },
                2: {
                    icon: 'food.jpg',
                    label: 'Lunch! 😁',
                    startTime: '11:30 AM',
                    endTime: '12:30 PM',
                    endDate: '20170101',
                },
            };
            const events = drainGenerator(EventApi.loadEventRange(
                {
                    '20170101': {
                        events: [1, 2],
                    }
                }, 1));
            expect(events).to.deep.equal(eventsNew);            
        });

        it('should retrieve nothing given an invalid event parameter', () => {
            const events = drainGenerator(EventApi.loadEventRange(
                {
                    '20160101': {
                        events: [10, 11],
                    }
                }, 1));
            expect(events).to.deep.equal({});
        });

        it ('should retrieve nothing given an invalid userId parameter', () => {
            const events = drainGenerator(EventApi.loadEventRange({
                    '20170101': {
                        events: [1, 2],
                    }
                }, 0));
            expect(events).to.deep.equal({});
        });
    });

    describe('insertEvent()', () => {
        it('should insert an event given correct data', () => {
            const event = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            const er = drainGenerator(EventApi.insertEvent(1, event, 1));
            expect(er.id).to.equal(5);
            expect(er.data).to.deep.equal(event);
        });

        it ('should fail to insert given invalid data', () => {
            const event = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
            };
            const er = drainGenerator(EventApi.insertEvent(1, event, 1));
            expect(er).to.deep.equal({});
        });

        it ('should fail to insert given an invalid userId parameter', () => {
            const event = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            const er = drainGenerator(EventApi.insertEvent(1, event, 0));
            expect(er).to.deep.equal({});
        });
    });

    describe('updateEvent()', () => {
        it ('should update an event given correct data', () => {
            const event = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            const er = drainGenerator(EventApi.updateEvent(1, 1, event, 1));
            expect(er.id).to.equal(1);
            expect(er.data).to.deep.equal(event);        
        });

        it ('should fail to update given invalid data', () => {
            const event = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
            };
            const er = drainGenerator(EventApi.updateEvent(1, event, 1));
            expect(er).to.deep.equal({});
        });

        it ('should fail to update given an invalid userId parameter', () => {
            const event = {
                icon: 'scissors.jpg',
                label: 'Haircut',
                startTime: '08:15 AM',
                endTime: '10:15 AM',
                endDate: '20170101',
            };
            const er = drainGenerator(EventApi.updateEvent(1, event, 2));
            expect(er).to.deep.equal({});
        });
    });

    describe('deleteEvent()', () => {
        it ('should delete an event given correct data', () => {
            const er = drainGenerator(EventApi.deleteEvent(1, 1, 1));
            expect(er).to.equal(1);
        });

        it ('should fail to delete given an invalid userId parameter', () => {
            const er = drainGenerator(EventApi.deleteEvent(1, 1, 3));
            expect(er).to.equal(-1);
        });
    });
});