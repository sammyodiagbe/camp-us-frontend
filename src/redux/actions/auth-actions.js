//import { CREATE_ACCOUNT } from "../action-types";
import {
    CREATE_ACCOUNT_ENDPOINT,
    LOG_IN_USER,
    VERIFY_AUTHENTICATION
} from "../../helpers/api-end-points";
import axios from "axios";
import { SET_ACTIVE_USER } from "../action-types";

export const createUserAccount = (data) => {
    return (dispatch) => {
        const createUserAccount = axios.post(CREATE_ACCOUNT_ENDPOINT, data, {
            withCredentials: true
        });
        createUserAccount
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const logUserIn = (data) => {
    return (dispatch) => {
        const logUserIn = axios.post(LOG_IN_USER, data, { withCredentials: true });
        logUserIn
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));
    };
};

// verify user authentication
export const verifyUserAuthentication = () => {
    return (dispatch) => {
        const verifyAuth = axios.post(VERIFY_AUTHENTICATION, null, { withCredentials: true });
        verifyAuth
            .then((response) => {
                const { user } = response.data;
                dispatch(setActiveUser(user));
            })
            .catch((err) => console.log(err));
    };
};

function setActiveUser(user) {
    return {
        type: SET_ACTIVE_USER,
        payload: user
    };
}
