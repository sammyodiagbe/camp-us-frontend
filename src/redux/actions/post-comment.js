import axios from "axios";
import { HAVE_SAY, COMMENT, LIKE_UNLIKE } from "../../helpers/api-end-points";
import donePosting from "../../assets/audio/insight.ogg";

export const haveASay = (content) => {
    return (dispatch) => {
        let makeSay = axios.post(HAVE_SAY, { content }, { withCredentials: true });
        makeSay
            .then((response) => {
                const audio = new Audio(donePosting);
                audio
                    .play()
                    .then(() => {
                        console.log("done Posting");
                    })
                    .catch((err) => console.log(err));
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

export const likeOrUnlike = (postid) => {
    return (dispatch) => {
        let likeorunlike = axios.post(LIKE_UNLIKE, { say: postid }, { withCredentials: true });
        likeorunlike
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));
    };
};
