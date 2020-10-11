import React, { Component } from "react";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
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
        const { name, email, address } = this.state;
        const order = {
          ingredients,
          price: totalPrice,
          customer: {
            name: "Daniel",
            address: {
              street: "Wiśniowa",
              zipcode: "12345",
              country: "Poland",
            },
            email: "nana@ma.pl",
          },
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
    const { loading } = this.state;
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {loading ? (
          <Spinner />
        ) : (
          <form>
            <Input
              inputtype="input"
              type="text"
              name="name"
              placeholder="Your name"
            />
            <Input
              inputtype="input"
              type="email"
              name="email"
              placeholder="Your email"
            />
            <Input
              inputtype="input"
              type="text"
              name="street"
              placeholder="Street"
            />
            <Input
              inputtype="input"
              type="text"
              name="postal"
              placeholder="Postal Code"
            />
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
