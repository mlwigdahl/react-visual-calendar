
import { expect } from 'chai';

import { drainGenerator } from '../common/TestHelpers';

import DateApi from './mockDateApi';

describe('Date Api', () => {
    describe('loadDateRange()', () => {
        it('should retrieve correctly-formatted data on loadDateRange', () => {
            const datesNew = {
                '20170102': { 
                    events: [3, 4]
                },
                '20170101': {
                    events: [1, 2],
                },
                '20161231': { 
                    events: [],
                },
            };
            const dates = drainGenerator(DateApi.loadDateRange('20161231', '20170102', 1));
            expect(dates).to.deep.equal(datesNew);
        });

        it('should retrieve nothing given an invalid date range on loadDateRange', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20000101', '20010201', 1));
            expect(dates).to.deep.equal({});
        });
    });
});