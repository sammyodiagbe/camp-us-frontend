import axios from "axios";
import { GET_CONVERSATIONS } from "../../helpers/api-end-points";
import { SET_CONVERSATIONS } from "../action-types";

const setConversations = (data) => {
    return {
        type: SET_CONVERSATIONS,
        payload: data
    };
};
export const getConversations = () => {
    return (dispatch) => {
        let getconversation = axios.get(GET_CONVERSATIONS, { withCredentials: true });
        getconversation
            .then((response) => {
                return dispatch(setConversations(response.data));
            })
            .catch((err) => console.log(err));
    };
};