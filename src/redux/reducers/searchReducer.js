import { SET_SEARCH_RESULT } from "../action-types";

const initState = {
    searchedusers: []
};

const searchReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_SEARCH_RESULT:
            state = { ...state, searchedusers: payload };
            break;

        default:
            break;
    }
    return state;
};

export default searchReducer;
