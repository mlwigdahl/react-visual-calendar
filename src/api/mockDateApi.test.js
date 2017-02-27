
import { expect } from 'chai';

import { drainGenerator } from '../common/TestHelpers';

import DateApi from './mockDateApi';

describe('Date Api', () => {
    describe('loadDateRange()', () => {
        it('should retrieve correctly-formatted data', () => {
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

        it('should retrieve nothing given a date range with no data', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20000101', '20010201', 1));
            expect(dates).to.deep.equal({});
        });

        it('should retrieve nothing given an incorrect userId', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20161231', '20170102', 2));
            expect(dates).to.deep.equal({});
        });

        it('should retrieve nothing given an impossible date range (end before beginning)', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20170102', '20161231', 1));
            expect(dates).to.deep.equal({});
        });

        it ('should retrieve nothing given invalid startDate parameter', () => {
            const dates = drainGenerator(DateApi.loadDateRange(undefined, '20161231', 1));
            expect(dates).to.deep.equal({});
        });

        it ('should retrieve nothing given invalid endDate parameter', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20170102', undefined, 1));
            expect(dates).to.deep.equal({});
        });

        it ('should retrieve nothing given invalid userId parameter', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20170102', '20161231', undefined));
            expect(dates).to.deep.equal({});
        });
    });
});