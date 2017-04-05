
import { call, apply/*, put*/ } from 'redux-saga/effects';

import { testApiConfig, target, apiPath, port } from './testApiConfig';

const state = {
    app: {
        user: {
            id: 1,
            name: 'Test User',
            error: undefined,
        }
    }
};

const goodUser = 'asdf';
const goodPassword = 'asdf';

// TODO START HERE need a way to invoke the saga functions from testing...

const AppApi = {
    loginAttempt: function* (username, password) {
        try {
            if (testApiConfig === 'remote') {
                yield call(fetch, 
                    `http://${target}:${port}/${apiPath}/logon`,
                    { method: 'GET' }); // real API will include username/password
                const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
                yield apply(resp, resp.json);
            } else {
                if (username === goodUser && password === goodPassword) {
                    return { ...state.app.user };
                }
                else {
                    return { id: 0, name: '', error: 'bad credentials' };
                }
            }
        } catch(error) {
            return []; // TODO more here
        }
    }
};

export default AppApi;