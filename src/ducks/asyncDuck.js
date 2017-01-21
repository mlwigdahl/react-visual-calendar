import initialState from './initialState';

// actions
export const actions = {
    ASYNC_REQUEST: 'react-visual-calendar/async/ASYNC_REQUEST',
    ASYNC_ERROR: 'react-visual-calendar/async/ASYNC_ERROR'
};

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) == '_SUCCESS';
}

function actionTypeEndsInFailure(type) {
    return type.substring(type.length - 8) == '_FAILURE';
}

// reducer
export function reducer(state = initialState.async, action) {
    if (action.type == actions.ASYNC_REQUEST) {
        return { ...state, callsActive: state.callsActive + 1 };
    } else if (action.type == actions.ASYNC_ERROR) {
        return { ...state, lastError: action.error };
    } else if (actionTypeEndsInFailure(action.type) || actionTypeEndsInSuccess(action.type)) {
        return { ...state, callsActive: state.callsActive - 1 };
    }

    return state;
}

// sagas

// action creators

export const creators = {
    asyncRequest: () => {
        return { type: actions.ASYNC_REQUEST };
    },
    asyncError: (error) => {
        return { type: actions.ASYNC_ERROR, error };
    }
};