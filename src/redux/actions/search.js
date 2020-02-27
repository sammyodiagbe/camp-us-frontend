import Axios from "axios";
import { FIND_SOMEONE } from "../../helpers/api-end-points";
import { SET_SEARCH_RESULT } from "../action-types";

export const setSearchResult = (data) => {
    return {
        type: SET_SEARCH_RESULT,
        payload: data
    };
};
export const findUser = (searchquery) => {
    console.log("let find a user");
    return (dispatch) => {
        let finduser = Axios.get(`${FIND_SOMEONE}/${searchquery}`, { withCredentials: true });
        finduser
            .then((response) => {
                const { searchedusers } = response.data;
                dispatch(setSearchResult(searchedusers));
            })
            .catch((err) => console.log(err));
    };
};
