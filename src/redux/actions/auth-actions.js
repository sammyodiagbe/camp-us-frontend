//import { CREATE_ACCOUNT } from "../action-types";
import {
    CREATE_ACCOUNT_ENDPOINT,
    LOG_IN_USER,
    VERIFY_AUTHENTICATION
} from "../../helpers/api-end-points";
import axios from "axios";
import { SET_ACTIVE_USER } from "../action-types";
import { isCreatingAccount, isLoggingIn, isVerifyingUserAuthentication } from "./app-interaction";

export const createUserAccount = (data) => {
    return (dispatch) => {
        dispatch(isCreatingAccount(true));
        const createUserAccount = axios.post(CREATE_ACCOUNT_ENDPOINT, data, {
            withCredentials: true
        });
        createUserAccount
            .then((response) => {
                console.log(response.data);
                dispatch(isCreatingAccount(false));
            })
            .catch((err) => {
                console.log(err);
                dispatch(isCreatingAccount(false));
            });
    };
};

export const logUserIn = (data) => {
    return (dispatch) => {
        dispatch(isLoggingIn(true));
        const logUserIn = axios.post(LOG_IN_USER, data, { withCredentials: true });
        logUserIn
            .then((response) => {
                const { user } = response.data;
                dispatch(setActiveUser(user))
                dispatch(isLoggingIn(false));
            })
            .catch((err) => dispatch(isLoggingIn(false)));
    };
};

// verify user authentication
export const verifyUserAuthentication = () => {
    return (dispatch) => {
        dispatch(isVerifyingUserAuthentication(true));
        const verifyAuth = axios.post(VERIFY_AUTHENTICATION, null, { withCredentials: true });
        verifyAuth
            .then((response) => {
                const { user } = response.data;
                dispatch(setActiveUser(user));
                dispatch(isVerifyingUserAuthentication(false));
            })
            .catch((err) => {
                console.log(err);
                dispatch(isVerifyingUserAuthentication(false));
            });
    };
};

function setActiveUser(user) {
    return {
        type: SET_ACTIVE_USER,
        payload: user
    };
}
