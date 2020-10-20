import {
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_ERROR,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  FETCH_INGREDIENTS_PRICES,
  FETCH_INGREDIENTS_PRICES_SUCCESS,
  FETCH_INGREDIENTS_PRICES_ERROR,
  RESET
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

const fetchIngredientsPrices = () => {
  return {
    type: FETCH_INGREDIENTS_PRICES,
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

const fetchIngredientsPricesError = (error) => {
  return {
    type: FETCH_INGREDIENTS_PRICES_ERROR,
    error,
  };
};

const fetchIngredientsPricesSuccess = (payload) => {
  return {
    type: FETCH_INGREDIENTS_PRICES_SUCCESS,
    payload,
  };
};

export const resetIngredients = () => {
  return {
    type: RESET
  }
}



export const startFetchIngredients = () => {
  return (dispatch) => {
    dispatch(fetchIngredients());
    axios
      .get("/ingredients.json")
      .then((res) => {
        const { data } = res;
        dispatch(fetchIngredientsSuccess(data));
      }).then(() => {
        dispatch(startFetchIngredientsPrices())
      })
      .catch((err) => {
        dispatch(fetchIngredientsError(err));
      });
  };
};

const startFetchIngredientsPrices = () => {
  return (dispatch) => {
    dispatch(fetchIngredientsPrices())
    axios.get("/prices.json").then(res => {
      const {data} = res;
      dispatch(fetchIngredientsPricesSuccess(data))
    }).catch(err => {
      dispatch(fetchIngredientsPricesError(err))
    })
  }
}