
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
            expect(dates).toEqual(datesNew);
        });

        it('should retrieve nothing given a date range with no data', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20000101', '20010201', 1));
            expect(dates).toEqual({});
        });

        it('should retrieve nothing given an incorrect userId', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20161231', '20170102', 2));
            expect(dates).toEqual({});
        });

        it('should retrieve nothing given an impossible date range (end before beginning)', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20170102', '20161231', 1));
            expect(dates).toEqual({});
        });

        it ('should retrieve nothing given invalid startDate parameter', () => {
            const dates = drainGenerator(DateApi.loadDateRange(undefined, '20161231', 1));
            expect(dates).toEqual({});
        });

        it ('should retrieve nothing given invalid endDate parameter', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20170102', undefined, 1));
            expect(dates).toEqual({});
        });

        it ('should retrieve nothing given invalid userId parameter', () => {
            const dates = drainGenerator(DateApi.loadDateRange('20170102', '20161231', undefined));
            expect(dates).toEqual({});
        });
    });

    describe("insertDate()", () => {
        it('should insert a date given correct data', () => {
            const dr = drainGenerator(DateApi.insertDate('20170201', 1));
            expect(dr.id).toBe('20170201');
            expect(dr.data).toEqual({ events: [] });
        });

        it ('should fail to insert given an invalid date index', () => {
            const dr = drainGenerator(DateApi.insertDate('ABCDEFG', 1));
            expect(dr).toEqual({});
        });

        it ('should fail to insert given an invalid userId parameter', () => {
            const dr = drainGenerator(DateApi.insertDate('20170202', 0));
            expect(dr).toEqual({});
        });
    });
});