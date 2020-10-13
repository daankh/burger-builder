import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import ingredientsReducer from "../reducers/ingredients";

//it allows us to apply middleware and use redux dev tools in the same time
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      ingredients: ingredientsReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
