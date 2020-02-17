import axios from "axios";
import { HAVE_SAY, COMMENT } from "../../helpers/api-end-points";

export const haveASay = (content) => {
    return (dispatch) => {
        let makeSay = axios.post(HAVE_SAY, { content }, { withCredentials: true });
        makeSay
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const addComment = (comment, postid) => {
    return (dispatch) => {
        let addcomment = axios.post(COMMENT, { comment, postid }, { withCredentials: true });
        addcomment
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
