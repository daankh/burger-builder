import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import burgerBuilderReducer from "../reducers/burgerBuilder";
import orderReducer from "../reducers/order";

//it allows us to apply middleware and use redux dev tools in the same time
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      burgerBuilder: burgerBuilderReducer,
      order: orderReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
