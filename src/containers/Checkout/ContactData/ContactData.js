import React, { Component } from "react";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
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
    currentOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({ orderForm: currentOrderForm });
  };

  checkValidity = (value, rules) => {
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
    const { loading, orderForm } = this.state;

    const inputsArray = [];
    for (let key in orderForm) {
      inputsArray.push({
        id: key,
        config: orderForm[key],
      });
    }

    const inputElements = inputsArray.map((inputElement) => {
      const { id, config } = inputElement;
      const { elementType, elementConfig, value } = config;
      return (
        <Input
          key={id}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
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
            <Button btnType="Success">ORDER</Button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
