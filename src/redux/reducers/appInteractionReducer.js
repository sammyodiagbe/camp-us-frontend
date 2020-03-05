import {
    IS_VERIFYING_AUTHENTICATION,
    IS_CREATING_ACCOUNT,
    IS_LOGGING_IN,
    IS_GETTING_PROFILE_DETAILS,
    IS_GETTING_SAYS,
    IS_GETTING_SAY,
    IS_GETTING_CONVERSATIONS,
    IS_POSTING,
    IS_GETTING_CONVERSATION
} from "../action-types";

const initState = {
    isloggingin: false,
    iscreatingaccount: false,
    isverifyingauthentication: false,
    isgettingprofiledetails: false,
    isgettingsays: false,
    isgettingsinglesay: false,
    isgettingconversations: false,
    isgettingconversation: false,
    isposting: false
};

export default function(state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case IS_VERIFYING_AUTHENTICATION:
            state = { ...state, isverifyingauthentication: payload };
            break;
        case IS_CREATING_ACCOUNT:
            state = { ...state, iscreatingaccount: payload };
            break;
        case IS_LOGGING_IN:
            state = { ...state, isloggingin: payload };
            break;
        case IS_GETTING_PROFILE_DETAILS:
            state = { ...state, isgettingprofiledetails: payload };
            break;
        case IS_GETTING_SAYS:
            state = { ...state, isgettingsays: payload };
            break;

        case IS_GETTING_SAY:
            state = { ...state, isgettingsinglesay: payload };
            break;
        case IS_GETTING_CONVERSATIONS:
            state = { ...state, isgettingconversations: payload };
            break;

        case IS_POSTING:
            state = { ...state, isposting: payload };
            break;

        case IS_GETTING_CONVERSATION:
            state = { ...state, isgettingconversation: payload };
            break;
        default:
            break;
    }
    return state;
}
