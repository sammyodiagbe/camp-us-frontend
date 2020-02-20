import { GET_CONVERSATIONS } from "../action-types";

const initialState = {
    conversations: [],
    activeBubble: {}
};

const conversationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CONVERSATIONS:
            state = { ...state, conversations: payload };
            break;
        default:
            break;
    }

    return state;
};

export default conversationReducer;
