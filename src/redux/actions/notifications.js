import axios from "axios";
import { SET_USER_NOTIFICATIONS } from "../action-types";
import { GET_USER_NOTIFICATIONS } from "../../helpers/api-end-points";

export const setUserNotifications = (notifications) => {
    return {
        type: SET_USER_NOTIFICATIONS,
        payload: notifications
    };
};
export const getUserNotifications = () => {
    return (dispatch) => {
        const getnotifications = axios.get(GET_USER_NOTIFICATIONS, { withCredentials: true });
        getnotifications
            .then((response) => {
                const { data } = response;
                const { notifications } = data;
                console.log(notifications);
                dispatch(setUserNotifications(notifications));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
