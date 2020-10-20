import {
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_ERROR,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../actionTypes/ingredients";

const initialState = {
  ingredients: {},
  prices: {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
  },
  totalPrice: 4,
  error: null,
  loading: false,
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + state.prices[action.ingredientName]
      };
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
         totalPrice: state.totalPrice - state.prices[action.ingredientName]
      };
    }
    case FETCH_INGREDIENTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        ingredients: action.payload,
      };
    }
    case FETCH_INGREDIENTS_ERROR: {
      return {
        ...state,
        loading: false,
        ingredients: {},
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default ingredientsReducer;
