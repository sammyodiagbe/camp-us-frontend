import { SET_VIEWED_PROFILE, SET_VIEWED_USER_SAYS } from "../action-types";

const initialState = {
    viewed_user: null,
    viewed_user_says: []
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_VIEWED_PROFILE:
            state = { ...state, viewed_user: payload };
            break;

        case SET_VIEWED_USER_SAYS:
            state = { ...state, viewed_user_says: payload };
        default:
            break;
    }

    return state;
}
