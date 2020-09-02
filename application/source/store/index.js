import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {
  error: { message: null },
};

export const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));