
import { drainGenerator } from '../common/TestHelpers';

import CalendarApi, { calendar } from './mockCalendarApi';

describe('Calendar Api', () => {
    describe('loadCalendar()', () => {
        it('should retrieve correctly-formatted data when called with a valid parameter', () => {
            const cal = drainGenerator(CalendarApi.loadCalendar(1));
            expect(cal).toEqual(calendar);
        });

        it('should return nothing on invalid parameter', () => {
            const cal = drainGenerator(CalendarApi.loadCalendar(undefined));
            expect(cal).toEqual({});
        });

        it('should return nothing on valid but incorrect parameter', () => {
            const cal = drainGenerator(CalendarApi.loadCalendar(2));
            expect(cal).toEqual({});
        });
    });

    describe('loadDateIcon()', () => {
        it('should retrieve an icon label given a date and user', () => {
            const icon = drainGenerator(CalendarApi.loadDateIcon(1, 1));
            expect(icon).toEqual({ icon: 'icon' });
        });

        it('should return nothing on invalid parameter', () => {
            const icon = drainGenerator(CalendarApi.loadDateIcon(undefined, undefined));
            expect(icon).toEqual({});
        });

        it('should return nothing on valid but incorrect parameter', () => {
            const icon = drainGenerator(CalendarApi.loadDateIcon(2, 2));
            expect(icon).toEqual({});
        });
    });

    describe('updateDateIcon()', () => {
        it ('should update an icon label given an icon, a date, and a user', () => {
            const icon = drainGenerator(CalendarApi.updateDateIcon({ icon: 'icon' }, 1, 1));
            expect(icon).toEqual({ icon: 'icon' });
        });

        it('should return nothing on invalid parameter', () => {
            const icon = drainGenerator(CalendarApi.updateDateIcon(undefined, undefined, undefined));
            expect(icon).toEqual({});
        });

        it('should return nothing on valid but incorrect parameter', () => {
            const icon = drainGenerator(CalendarApi.updateDateIcon(undefined, 2, 2));
            expect(icon).toEqual({});
        });

        it('should return nothing on undefined icon', () => {
            const icon = drainGenerator(CalendarApi.updateDateIcon(undefined, 1, 1));
            expect(icon).toEqual({});
        })
    });
});