
import { expect } from 'chai';

import { drainGenerator } from '../common/TestHelpers';

import EventApi from './mockEventApi';


// TODO START HERE more tests needed

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

        it('should retrieve nothing given invalid data range', () => {
            const events = drainGenerator(EventApi.loadEventRange({}, 1));
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
    });

    describe('deleteEvent()', () => {
        it ('should delete an event given correct data', () => {
            const er = drainGenerator(EventApi.deleteEvent(1, 1, 1));
            expect(er).to.equal(1);
        });
    });
});