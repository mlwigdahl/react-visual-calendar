
import { expect } from 'chai';

import { drainGenerator } from '../common/TestHelpers';

import CalendarApi, { calendar } from './mockCalendarApi';

describe('Calendar Api', () => {
    it('should retrieve correctly-formatted data on loadCalendar', () => {
        const cal = drainGenerator(CalendarApi.loadCalendar(1));
        expect(cal).to.deep.equal(calendar);
    });
});