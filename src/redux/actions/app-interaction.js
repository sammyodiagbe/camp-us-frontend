import {
    IS_LOGGING_IN,
    IS_CREATING_ACCOUNT,
    IS_GETTING_PROFILE_DETAILS,
    IS_GETTING_SAYS,
    IS_VERIFYING_AUTHENTICATION,
    IS_GETTING_SAY,
    IS_GETTING_CONVERSATIONS,
    IS_POSTING,
    IS_GETTING_CONVERSATION
} from "../action-types";

export const isVerifyingUserAuthentication = (verify) => {
    return {
        type: IS_VERIFYING_AUTHENTICATION,
        payload: verify
    };
};
export const isLoggingIn = (islogginin) => {
    return {
        type: IS_LOGGING_IN,
        payload: islogginin
    };
};

export const isCreatingAccount = (iscreatingaccount) => {
    return {
        type: IS_CREATING_ACCOUNT,
        payload: iscreatingaccount
    };
};

export const isGettingUserProfileDetails = (getting) => {
    return {
        type: IS_GETTING_PROFILE_DETAILS,
        payload: getting
    };
};

export const isGettingUserSays = (isgetting) => {
    return {
        type: IS_GETTING_SAYS,
        payload: isgetting
    };
};

export const isGettingPost = (isgetting) => {
    return {
        type: IS_GETTING_SAY,
        payload: isgetting
    };
};

export const isGettingConversations = (isgetting) => {
    return {
        type: IS_GETTING_CONVERSATIONS,
        payload: isgetting
    };
};

export const isPosting = (isposting) => {
    return {
        type: IS_POSTING,
        payload: isposting
    };
};

export const isGettingConversation = (isgetting) => {
    return {
        type: IS_GETTING_CONVERSATION,
        payload: isgetting
    };
};
