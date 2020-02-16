import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import AppInteraction from "./appInteractionReducer";

const rootReducer = combineReducers({
    authentication: authReducer,
    profile: profileReducer,
    interactions: AppInteraction
});

export default rootReducer;
