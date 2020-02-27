import {
    SET_CONVERSATIONS,
    SET_ACTIVE_CONVERSATION,
    SET_FEEDS,
    SET_VIEWED_POST
} from "../action-types";

const initialState = {
    conversations: [],
    activeBubble: {},
    newsfeeds: [],
    viewedPost: {}
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

        case SET_FEEDS:
            state = { ...state, newsfeeds: payload };
            break;

        case SET_VIEWED_POST:
            state = { ...state, viewedPost: payload };
            break;
        default:
            break;
    }

    return state;
};

export default conversationReducer;
