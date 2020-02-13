import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import reduxThunk from "redux-thunk";

const middleWare = applyMiddleware(reduxThunk);
const store = createStore(rootReducer, undefined, middleWare);

export default store;
