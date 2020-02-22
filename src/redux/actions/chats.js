import axios from "axios";
import { GET_ACTIVE_CONVERSATION, SEND_MESSAGE } from "../../helpers/api-end-points";
import { SET_ACTIVE_CONVERSATION } from "../action-types";

export const setChatBubble = (data) => {
    return {
        type: SET_ACTIVE_CONVERSATION,
        payload: data
    };
};

export const fetchConversation = (id) => {
    return (dispatch) => {
        const getConversation = axios.get(`${GET_ACTIVE_CONVERSATION}/${id}`, {
            withCredentials: true
        });
        getConversation
            .then((response) => {
                dispatch(setChatBubble(response.data));
            })
            .catch((err) => console.log(err));
    };
};

export const sendMessage = (data) => {
    return (dispatch) => {
        const sendmessage = axios.post(SEND_MESSAGE, data, { withCredentials: true });
        sendmessage
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));
    };
};
