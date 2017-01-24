import delay from './delay';

const state = {
    app: {
        user: {
            id: 1,
            name: 'Test User',
            error: undefined,
        }
    }
};

class AppApi {
    static loginAttempt(/*username, password*/) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({...state.app.user});
            }, delay);
        });
    }
}

export default AppApi;