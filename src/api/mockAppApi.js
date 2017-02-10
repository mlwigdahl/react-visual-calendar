
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

const AppApi = {
    loginAttempt: function* (/*username, password*/) {
        try {
            /*
            yield call(fetch, 
                `http://${target}:${port}/${apiPath}/logon`,
                { method: 'GET', mode: cors }); // real API will include username/password
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            return {...state.app.user};
        } catch(error) {
            return []; // TODO more here
        }
    }
};

export default AppApi;