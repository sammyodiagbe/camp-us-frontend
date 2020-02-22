import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import AppInteraction from "./appInteractionReducer";
import ConversationReducer from "./conversationReducer";

const rootReducer = combineReducers({
    authentication: authReducer,
    profile: profileReducer,
    interactions: AppInteraction,
    conversation: ConversationReducer
});

export default rootReducer;
