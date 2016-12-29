import initialState from './initialState';

// actions
export const actions = {
    AJAX_REQUEST: 'react-visual-calendar/ajax/AJAX_REQUEST',
    AJAX_ERROR: 'react-visual-calendar/ajax/AJAX_ERROR'
};

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) == '_SUCCESS';
}

function actionTypeEndsInFailure(type) {
    return type.substring(type.length - 8) == '_FAILURE';
}

// reducer
export function reducer(state = initialState.ajax, action) {
    if (action.type == actions.AJAX_REQUEST) {
        return { ...state, callsActive: state.callsActive + 1 };
    } else if (action.type == actions.AJAX_ERROR) {
        return { ...state, lastError: action.error };
    } else if (actionTypeEndsInFailure(action.type) || actionTypeEndsInSuccess(action.type)) {
        return { ...state, callsActive: state.callsActive - 1 };
    }

    return state;
}

// sagas

// action creators

export const creators = {
    ajaxRequest: () => {
        return { type: actions.AJAX_REQUEST };
    },
    ajaxError: (error) => {
        return { type: actions.AJAX_ERROR, error };
    }
};