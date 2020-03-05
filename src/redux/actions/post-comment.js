import axios from "axios";
import {
    HAVE_SAY,
    COMMENT,
    LIKE_UNLIKE,
    LOAD_FEEDS,
    GET_POST_DATA
} from "../../helpers/api-end-points";
import donePosting from "../../assets/audio/insight.ogg";
import { SET_FEEDS, SET_VIEWED_POST } from "../action-types";
import { isGettingPost, isGettingUserSays, isPosting } from "./app-interaction";

export const setViewedPost = (data) => {
    return {
        type: SET_VIEWED_POST,
        payload: data
    };
};
export const getViewedPostData = (postid) => {
    return (dispatch) => {
        dispatch(isGettingPost(true));
        let post = axios.get(`${GET_POST_DATA}/${postid}`, { withCredentials: true });
        post.then((response) => {
            const { say } = response.data;
            dispatch(isGettingPost(false));
            dispatch(setViewedPost(say));
        }).catch((err) => console.log(err));
    };
};
export const haveASay = (content) => {
    return (dispatch) => {
        dispatch(isPosting(true));
        let makeSay = axios.post(HAVE_SAY, { content }, { withCredentials: true });
        makeSay
            .then((response) => {
                const audio = new Audio(donePosting);
                audio
                    .play()
                    .then(() => {
                        audio.remove();
                    })
                    .catch((err) => console.log(err));
                dispatch(isPosting(false));
            })
            .catch((err) => {
                dispatch(isPosting(false));
            });
    };
};

export const addComment = (comment, postid) => {
    return (dispatch) => {
        let addcomment = axios.post(COMMENT, { body: comment, postid }, { withCredentials: true });
        addcomment
            .then((response) => {})
            .catch((err) => {
                console.log(err);
            });
    };
};

export const likeOrUnlike = (postid) => {
    return (dispatch) => {
        let likeorunlike = axios.post(LIKE_UNLIKE, { say: postid }, { withCredentials: true });
        likeorunlike.then((response) => {}).catch((err) => console.log(err));
    };
};

export const setFeeds = (feeds) => {
    return {
        type: SET_FEEDS,
        payload: feeds
    };
};

export const loadFeeds = () => {
    return (dispatch) => {
        dispatch(isGettingUserSays(true));
        let gettingfeeds = axios.get(LOAD_FEEDS, { withCredentials: true });
        gettingfeeds
            .then((response) => {
                const { data } = response;
                const { feeds } = data;
                dispatch(setFeeds(feeds.reverse()));
                dispatch(isGettingUserSays(false));
            })
            .catch((err) => dispatch(isGettingUserSays(false)));
    };
};
