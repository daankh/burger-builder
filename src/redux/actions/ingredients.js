import {
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_ERROR,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../actionTypes/ingredients";
import axios from "../../axios-orders";

export const addIngredient = (ingredientName) => {
  return {
    type: ADD_INGREDIENT,
    ingredientName,
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: REMOVE_INGREDIENT,
    ingredientName,
  };
};

const fetchIngredients = () => {
  return {
    type: FETCH_INGREDIENTS,
  };
};

const fetchIngredientsSuccess = (payload) => {
  return {
    type: FETCH_INGREDIENTS_SUCCESS,
    payload,
  };
};

const fetchIngredientsError = (error) => {
  return {
    type: FETCH_INGREDIENTS_ERROR,
    error,
  };
};

export const startFetchIngredients = () => {
  return (dispatch) => {
    dispatch(fetchIngredients());
    axios
      .get("/ingredients.json")
      .then((res) => {
        const { data } = res;
        dispatch(fetchIngredientsSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsError(err));
      });
  };
};
