import axios from "axios";
import { GET_CONVERSATIONS } from "../../helpers/api-end-points";
import { SET_CONVERSATIONS } from "../action-types";
import { isGettingConversations } from "./app-interaction";

const setConversations = (data) => {
    return {
        type: SET_CONVERSATIONS,
        payload: data
    };
};
export const getConversations = () => {
    return (dispatch) => {
        dispatch(isGettingConversations(true));
        let getconversation = axios.get(GET_CONVERSATIONS, { withCredentials: true });
        getconversation
            .then((response) => {
                console.log(response.data.conversations);
                dispatch(setConversations(response.data.conversations.reverse()));
                dispatch(isGettingConversations(false));
            })
            .catch((err) => dispatch(isGettingConversations(false)));
    };
};
