import { SET_ACTIVE_USER } from "../action-types";

const defaultStore = {
    user: null
};

export default function(state = defaultStore, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_ACTIVE_USER:
            state = { ...state, user: payload };
            break;
        default:
            break;
    }

    return state;
}
