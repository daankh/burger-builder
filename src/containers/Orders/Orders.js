import React, { Component } from "react";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const { data } = res;
        const orders = [];
        for (let key in data) {
          orders.push({
            ...data[key],
            id: key,
          });
        }
        this.setState({
          loading: false,
          orders,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const { orders, loading } = this.state;
    return (
      <div>
        {!loading &&
          orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
