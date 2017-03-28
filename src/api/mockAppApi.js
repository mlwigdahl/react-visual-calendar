
//import { call, apply/*, put*/ } from 'redux-saga/effects';
//import { target, apiPath, port, cors } from '../api/AppApi';

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

const AppApi = {
    loginAttempt: function* (username, password) {
        try {
            /*
            yield call(fetch, 
                `http://${target}:${port}/${apiPath}/logon`,
                { method: 'GET', mode: cors }); // real API will include username/password
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            if (username === goodUser && password === goodPassword) {
                return { ...state.app.user };
            }
            else {
                return { id: 0, name: '', error: 'bad credentials' };
            }
        } catch(error) {
            return []; // TODO more here
        }
    }
};

export default AppApi;