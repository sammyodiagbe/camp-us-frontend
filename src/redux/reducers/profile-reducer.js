import { SET_VIEWED_PROFILE, SET_VIEWED_USER_SAYS, SET_RELATIONSHIP } from "../action-types";

const initialState = {
    viewed_user: {},
    viewed_user_says: [],
    viewedProfileRelationship: {},
    isFollowingUser: false,
    relationshipIsMutual: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_VIEWED_PROFILE:
            state = { ...state, viewed_user: payload };
            break;

        case SET_VIEWED_USER_SAYS:
            state = { ...state, viewed_user_says: payload };
            break;
        case SET_RELATIONSHIP:
            state = { ...state, viewedProfileRelationship: payload };
            break;
        default:
            break;
    }

    return state;
}
