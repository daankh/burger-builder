import React, { Component } from "react";
import {connect} from "react-redux";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { resetIngredients } from "../../../redux/actions/ingredients";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your ZIP code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
        value: "fastest",
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    this.setState(
      {
        loading: true,
      },
      () => {
        const { ingredients, totalPrice } = this.props;
        const { orderForm } = this.state;
        const formData = {};

        for (let formElementId in orderForm) {
          formData[formElementId] = orderForm[formElementId].value;
        }

        const order = {
          ingredients,
          price: totalPrice,
          customer: formData,
        };
        axios
          .post("/orders.json", order)
          .then((response) => {
            this.setState({
              loading: false,
            });
            this.props.history.push("/");
            this.props.resetIngredients();
          })
          .catch((err) => {
            this.setState({
              loading: false,
            });
          });
      }
    );
  };

  inputChangedHandler = (e, inputIdentifier) => {
    const { value } = e.target;
    const { orderForm } = this.state;
    const currentOrderForm = {
      ...orderForm,
    };
    const updatedFormElement = { ...currentOrderForm[inputIdentifier] };
    updatedFormElement.value = value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    currentOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let inputId in currentOrderForm) {
      if (currentOrderForm[inputId].validation) {
        formIsValid = currentOrderForm[inputId].valid && formIsValid;
      }
    }

    this.setState({ orderForm: currentOrderForm, formIsValid });
  };

  checkValidity = (value, rules = {}) => {
    let isValid = false;
    const trimmedValue = value.trim();

    if (rules.required) {
      isValid = trimmedValue !== "";
      if (!isValid) {
        return isValid;
      }
    }

    if (rules.minLength) {
      isValid = trimmedValue.length >= rules.minLength;
      if (!isValid) {
        return isValid;
      }
    }

    if (rules.maxLength) {
      isValid = trimmedValue.length <= rules.maxLength;
      if (!isValid) {
        return isValid;
      }
    }

    return isValid;
  };

  render() {
    const { loading, orderForm, formIsValid } = this.state;

    const inputsArray = [];
    for (let key in orderForm) {
      inputsArray.push({
        id: key,
        config: orderForm[key],
      });
    }

    const inputElements = inputsArray.map((inputElement) => {
      const { id, config } = inputElement;
      const {
        elementType,
        elementConfig,
        value,
        valid,
        validation,
        touched,
      } = config;
      return (
        <Input
          key={id}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          invalid={!valid}
          shouldValidate={validation}
          touched={touched}
          changed={(e) => this.inputChangedHandler(e, id)}
        />
      );
    });

    return (
      <div className={classes.ContactData} onSubmit={this.orderHandler}>
        <h4>Enter your Contact Data</h4>
        {loading ? (
          <Spinner />
        ) : (
          <form>
            {inputElements}
            <Button btnType="Success" disabled={!formIsValid}>
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ingredients}) => ({
  ingredients: ingredients.ingredients,
  totalPrice: ingredients.totalPrice
})

const mapDispatchToProps = (dispatch) => ({
  resetIngredients: () => dispatch(resetIngredients())
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
