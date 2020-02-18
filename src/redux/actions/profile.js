import axios from "axios";
import { SET_VIEWED_PROFILE, SET_VIEWED_USER_SAYS, SET_RELATIONSHIP } from "../action-types";
import {
    GET_USER_SAYS,
    GET_USER_PROFILE,
    CHECK_RELATIONSHIP,
    FOLLOW,
    UNFOLLOW
} from "../../helpers/api-end-points";
import { isGettingUserProfileDetails, isGettingUserSays } from "./app-interaction";

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

export const setRelationship = (data) => {
    return {
        type: SET_RELATIONSHIP,
        payload: data
    };
};

// get a user says
export const getUserSays = (id) => {
    return (dispatch) => {
        dispatch(isGettingUserSays(true));
        let getSays = axios.get(`${GET_USER_SAYS}/${id}`, { withCredentials: true });
        getSays
            .then((response) => {
                const { data } = response;
                dispatch(setViewedUserProfileSays(data.says));
                dispatch(isGettingUserSays(false));
            })
            .catch((err) => isGettingUserSays(false));
    };
};

// get user profile
export const getUserProfile = (id) => {
    return (dispatch) => {
        dispatch(isGettingUserProfileDetails(true));
        let getProfile = axios.get(`${GET_USER_PROFILE}/${id}`, { withCredentials: true });
        getProfile
            .then((response) => {
                const { user } = response.data;
                dispatch(setViewProfile(user));
                dispatch(getUserSays(id));
                dispatch(isGettingUserProfileDetails(false));
            })
            .then((err) => dispatch(isGettingUserProfileDetails(false)));
    };
};

// follow a user
export const followUser = (id) => {
    return (dispatch) => {
        const follow = axios.post(FOLLOW, { whomToFollow: id }, { withCredentials: true });
        follow
            .then((response) => {
                console.log(response.data);
                dispatch(checkRelationship(id));
            })
            .then((err) => console.log(err));
    };
};

export const unfollowUser = (id) => {
    console.log("let us unfollow user");
    return (dispatch) => {
        const unfollow = axios.post(UNFOLLOW, { whoToUnfollow: id }, { withCredentials: true });
        unfollow
            .then((response) => {
                console.log(response.data);
                dispatch(checkRelationship(id));
            })
            .then((err) => console.log(err));
    };
};

export const checkRelationship = (friendid) => {
    return (dispatch) => {
        // check the relationship between authenticated user and the current profile(user)
        let checkRelationship = axios.get(`${CHECK_RELATIONSHIP}/${friendid}`, {
            withCredentials: true
        });
        checkRelationship
            .then((response) => {
                const { data } = response;
                console.log(data);
                dispatch(setRelationship(data));
            })
            .catch((err) => console.log(err));
    };
};
