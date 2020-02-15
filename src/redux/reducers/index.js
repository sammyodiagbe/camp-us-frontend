import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";

const rootReducer = combineReducers({
    authentication: authReducer,
    profile: profileReducer
});

export default rootReducer;
