
import { drainGenerator } from '../common/TestHelpers';

import AppApi from './mockAppApi';

describe('App Api', () => {
    it('should retrieve correctly-formatted data on successful loginAttempt', () => {
        const state = {
            id: 1,
            name: 'Test User',
            error: undefined,
        };
        const ret = drainGenerator(AppApi.loginAttempt('asdf', 'asdf'));
        expect(ret).toEqual(state);
    });

    it('should retrieve failure indicator on failed loginAttempt', () => {
        const state = {
            id: 0,
            name: '',
            error: 'bad credentials',
        };
        const ret = drainGenerator(AppApi.loginAttempt('sdfa', 'asdf'));
        expect(ret).toEqual(state);
    });
});