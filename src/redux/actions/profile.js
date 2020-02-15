import axios from "axios";
import { SET_VIEWED_PROFILE, SET_VIEWED_USER_SAYS } from "../action-types";
import { GET_USER_SAYS, GET_USER_PROFILE, CHECK_RELATIONSHIP } from "../../helpers/api-end-points";

export const setViewProfile = (user) => {
    return {
        type: SET_VIEWED_PROFILE,
        payload: user
    };
};

// set viewed profile say
export const setViewedUserProfileSays = (says) => {
    return {
        type: SET_VIEWED_USER_SAYS,
        payload: says
    };
};

// get a user says
export const getUserSays = (id) => {
    console.log("getting user say");
    return (dispatch) => {
        let getSays = axios.get(`${GET_USER_SAYS}/${id}`, { withCredentials: true });
        getSays
            .then((response) => {
                const { data } = response;
                console.log(data);
                dispatch(setViewedUserProfileSays(data.says));
            })
            .catch((err) => console.log(err));
    };
};

// get user profile
export const getUserProfile = (id) => {
    console.log(id);
    return (dispatch) => {
        let getProfile = axios.get(`${GET_USER_PROFILE}/${id}`, { withCredentials: true });
        getProfile.then((response) => {
            const { user } = response.data;
            dispatch(setViewProfile(user));
            dispatch(getUserSays(id));
        });
    };
};

export const checkRelationship = (authuserid, friendid) => {
    return (dispatch) => {
        // check the relationship between authenticated user and the current profile(user)
        let checkRelationship = axios.get(`${CHECK_RELATIONSHIP}/${authuserid}/${friendid}`, {
            withCredentials: true
        });
        checkRelationship
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));
    };
};
