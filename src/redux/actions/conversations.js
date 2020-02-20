import axios from "axios";
import { GET_CONVERSATIONS } from "../../helpers/api-end-points";

export const getConversations = () => {
    return (dispatch) => {
        let getconversation = axios.get(GET_CONVERSATIONS, { withCredentials: true });
        getconversation
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));
    };
};
