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
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your ZIP code",
        },
        value: "",
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
        value: "",
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
        const order = {
          ingredients,
          price: totalPrice,
          customer: orderForm,
          deliveryMethod: "fastest",
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

  render() {
    const { loading, orderForm } = this.state;

    const inputsArray = [];
    for (let key in orderForm) {
      inputsArray.push({
        name: key,
        config: orderForm[key],
      });
    }

    const inputElements = inputsArray.map((inputElement) => {
      const { name, config } = inputElement;
      const { elementType, elementConfig, value } = config;
      return (
        <Input
          key={name}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
        />
      );
    });

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {loading ? (
          <Spinner />
        ) : (
          <form>
            {inputElements}
            <Button btnType="Success" clicked={this.orderHandler}>
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
