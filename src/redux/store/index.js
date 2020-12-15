import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import items from "../reducers";
const middleware = [thunkMiddleware];

const composeEnhancers =
    (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    items,
    {},
    composeEnhancers(applyMiddleware(...middleware))
);



