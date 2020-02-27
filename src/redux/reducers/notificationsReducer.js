import { SET_USER_NOTIFICATIONS } from "../action-types";

const initState = {
    notifications: []
};

const notificationsReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER_NOTIFICATIONS:
            state = { ...state, notifications: payload };
            break;
        default:
            break;
    }
    return state;
};

export default notificationsReducer;
