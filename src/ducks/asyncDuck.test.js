
import * as async from './asyncDuck';

// setup

const initialState = {
    async: {
        callsActive: 0,
        lastError: undefined,
    }
};

// helper functions

// duck tests

describe('Async Duck', () => {
    describe('reducer', () => {
        it('should update the status on async invocation', () => {

            const action = async.creators.asyncRequest();

            const newState = async.reducer(initialState.async, action);

            expect(newState.callsActive).toBe(1);
        }); 

        it('should support stacking multiple invocations', () => {

            const action = async.creators.asyncRequest();

            const newState = async.reducer(initialState.async, action);
            const newState2 = async.reducer(newState, action);
            const newState3 = async.reducer(newState2, action);

            expect(newState3.callsActive).toBe(3);
        }); 

        it('should update the status on async completion (success)', () => {

            const action = async.creators.asyncRequest();

            const newState = async.reducer(initialState.async, action);

            const action2 = { type: 'WHATEVER_SUCCESS', data: { something: '' } };

            const newState2 = async.reducer(newState, action2);

            expect(newState2.callsActive).toBe(0);
            expect(newState2.lastError).toBeUndefined;
        });

        it ('should update the status on async completion (failure)', () => {
            const action = async.creators.asyncRequest();

            const newState = async.reducer(initialState.async, action);

            const action2 = { type: 'WHATEVER_FAILURE', data: { error: 'oopsie' } };

            const newState2 = async.reducer(newState, action2);

            expect(newState2.callsActive).toBe(0);
            expect(newState2.lastError).toBeUndefined;
        });

        it ('should update the error on outright async call failure', () => {
            const action = async.creators.asyncRequest();

            const newState = async.reducer(initialState.async, action);

            const action2 = async.creators.asyncError('oopsie');

            const newState2 = async.reducer(newState, action2);

            expect(newState2.callsActive).toBe(1);
            expect(newState2.lastError).toBe('oopsie');
        });
    });
});

