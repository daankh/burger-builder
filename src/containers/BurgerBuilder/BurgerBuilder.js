import React, { Component, Fragment } from "react";
// import axios from "../../axios-orders";
import { connect } from "react-redux";
import {
  initIngredients,
  addIngredient,
  removeIngredient,
} from "../../redux/actions/burgerBuilder";
import axios from "../../axios-orders"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    const { initIngredients } = this.props;
    initIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
 
     return sum > 0;
  };

  addIngredientHandler = (type) => {
    const { addIngredient } = this.props;

    // const oldCount = this.props.ingredients[type];
    // const updatedCount = oldCount + 1;
    // const updatedIngredients = {
    //   ...this.props.ingredients,
    //   [type]: updatedCount,
    // };
    // const priceAddition = INGREDIENT_PRICES[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice + priceAddition;
    // this.setState(() => ({
    //   ingredients: updatedIngredients,
    //   totalPrice: newPrice,
    // }));
    // this.updatePurchaseState(updatedIngredients);

    addIngredient(type);
  };

  removeIngredientHandler = (type) => {
    const { removeIngredient } = this.props;

    // const oldCount = this.props.ingredients[type];
    // if (oldCount <= 0) {
    //   return;
    // }
    // const updatedCount = oldCount - 1;
    // const updatedIngredients = {
    //   ...this.props.ingredients,
    //   [type]: updatedCount,
    // };
    // const priceDeductuion = INGREDIENT_PRICES[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice - priceDeductuion;
    // this.setState(() => ({
    //   ingredients: updatedIngredients,
    //   totalPrice: newPrice,
    // }));
    // this.updatePurchaseState(updatedIngredients);

    removeIngredient(type);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCloseHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    const { history } = this.props;
    // const { ingredients, totalPrice } = this.props;
    // const queryParams = [];

    // for (let i in ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
    //   );
    // }
    // queryParams.push(`price=${totalPrice}`);
    // const queryString = queryParams.join("&");
    history.push({
      pathname: "/checkout",
      // search: "?" + queryString,
    });
  };

  render() {
    const { purchasing } = this.state;
    const { ingredients, totalPrice, loading, error } = this.props;
    const disabledInfo = {
      ...ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCloseHandler}>
          {loading ? (
            <Spinner />
          ) : (
            ingredients && (
              <OrderSummary
                ingredients={ingredients}
                price={totalPrice}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseClosed={this.purchaseCloseHandler}
              />
            )
          )}
        </Modal>
        {ingredients && !error ? (
          <Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              purchasable={this.updatePurchaseState(ingredients)}
              price={totalPrice}
              ordered={this.purchaseHandler}
            />
          </Fragment>
        ) : error ? (
          <p style={{ textAlign: "center" }}>{error.message}</p>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ burgerBuilder }) => ({
  ingredients: burgerBuilder.ingredients,
  totalPrice: burgerBuilder.totalPrice,
  loading: burgerBuilder.loading,
  error: burgerBuilder.error,
});

const mapDispatchToProps = (dispatch) => ({
  initIngredients: () => dispatch(initIngredients()),
  addIngredient: (ingredientName) => dispatch(addIngredient(ingredientName)),
  removeIngredient: (ingredientName) =>
    dispatch(removeIngredient(ingredientName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
// export default withErrorHandler(BurgerBuilder, axios);
