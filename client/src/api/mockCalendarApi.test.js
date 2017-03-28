
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
});