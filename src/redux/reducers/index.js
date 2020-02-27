import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import AppInteraction from "./appInteractionReducer";
import ConversationReducer from "./conversationReducer";
import SearchReducer from "./searchReducer";
import NotificationReducer from "./notificationsReducer";

const rootReducer = combineReducers({
    authentication: authReducer,
    profile: profileReducer,
    interactions: AppInteraction,
    conversation: ConversationReducer,
    searches: SearchReducer,
    notification: NotificationReducer
});

export default rootReducer;
