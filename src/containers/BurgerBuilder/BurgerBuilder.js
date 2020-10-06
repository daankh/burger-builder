import React, { Component, Fragment } from "react";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((res) => {
        const { data } = res;
        this.setState({
          ingredients: data,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          ingredients: null,
          error: err,
        });
      });
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchasable: sum > 0,
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount,
    };
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState(() => ({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    }));
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount,
    };
    const priceDeductuion = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeductuion;
    this.setState(() => ({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    }));
    this.updatePurchaseState(updatedIngredients);
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
    const { ingredients } = this.state;
    const queryParams = [];

    for (let i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
      );
    }
    const queryString = queryParams.join("&");
    history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
    // this.setState(
    //   {
    //     loading: true,
    //   },
    //   () => {
    //     const { ingredients, totalPrice } = this.state;
    //     const order = {
    //       ingredients,
    //       price: totalPrice,
    //       customer: {
    //         name: "Daniel",
    //         address: {
    //           street: "Wiśniowa",
    //           zipcode: "12345",
    //           country: "Poland",
    //         },
    //         email: "nana@ma.pl",
    //       },
    //       deliveryMethod: "fastest",
    //     };
    //     axios
    //       .post("/orders.json", order)
    //       .then((response) => {
    //         this.setState({
    //           loading: false,
    //           purchasing: false,
    //         });
    //       })
    //       .catch((err) => {
    //         this.setState({
    //           loading: false,
    //           purchasing: false,
    //         });
    //       });
    //   }
    // );
  };

  render() {
    const {
      ingredients,
      totalPrice,
      purchasable,
      purchasing,
      loading,
      error,
    } = this.state;
    const disabledInfo = {
      ...this.state.ingredients,
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
        {ingredients ? (
          <Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              purchasable={purchasable}
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

export default withErrorHandler(BurgerBuilder, axios);
