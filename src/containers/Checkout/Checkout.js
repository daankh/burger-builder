import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients,
      totalPrice: price,
    });
  }

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    history.replace("/checkout/contact-data");
  };

  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { ingredients, totalPrice } = this.state;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              ingredients={ingredients}
              totalPrice={totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
