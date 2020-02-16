import {
    IS_VERIFYING_AUTHENTICATION,
    IS_CREATING_ACCOUNT,
    IS_LOGGING_IN,
    IS_GETTING_PROFILE_DETAILS,
    IS_GETTING_SAYS
} from "../action-types";

const initState = {
    isloggingin: false,
    iscreatingaccount: false,
    isverifyauthentication: false,
    isgettingprofiledetails: false,
    isgettingsays: false
};

export default function(state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case IS_VERIFYING_AUTHENTICATION:
            state = { ...state, isverifyauthentication: payload };
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
        default:
            break;
    }
    return state;
}
