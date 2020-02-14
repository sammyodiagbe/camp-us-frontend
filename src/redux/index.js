import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleWare = composeWithDevTools(applyMiddleware(reduxThunk));
const store = createStore(rootReducer, undefined, middleWare);

export default store;
