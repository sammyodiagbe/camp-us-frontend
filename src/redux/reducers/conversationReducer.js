import { SET_CONVERSATIONS, SET_ACTIVE_CONVERSATION } from "../action-types";

const initialState = {
    conversations: [],
    activeBubble: {}
};

const conversationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_CONVERSATIONS:
            state = { ...state, conversations: payload };
            break;
        case SET_ACTIVE_CONVERSATION:
            state = { ...state, activeBubble: payload };
            break;
        default:
            break;
    }

    return state;
};

export default conversationReducer;
