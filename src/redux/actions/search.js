import Axios from "axios";
import { FIND_SOMEONE } from "../../helpers/api-end-points";

export const findUser = (searchquery) => {
    console.log("let find a user");
    return (dispatch) => {
        let finduser = Axios.get(`${FIND_SOMEONE}/${searchquery}`, { withCredentials: true });
        finduser
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));
    };
};
