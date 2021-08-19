import { SIGN_IN, SIGN_UP, SIGN_OUT_SUCCESS, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_IN_FAILURE } from '../Constants/actiontype';

const initialState = {
    auth: false,
    token: '',
    username: '',
    errorMessage: '',
    user: []
}

export default function AuthReducer (state = initialState, action) {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return Object.assign({}, state, {
                user: initialState.user.concat(action.payload),
                auth: !initialState.auth,
            });
        case SIGN_UP_SUCCESS:
            return Object.assign({}, state, {
                user: initialState.user.concat(action.payload),
                auth: !initialState.auth,
            });
        case SIGN_IN_FAILURE:
            return Object.assign({}, state, {
                errorMessage: initialState.errorMessage.concat(action.payload)
            });
        case SIGN_UP_FAILURE:
            return Object.assign({}, state, {
                errorMessage: initialState.errorMessage.concat(action.payload)
            });
        case SIGN_OUT_SUCCESS:
            return initialState;
    };

    return state;
}