import React from "react";
import classes from "./Order.module.css";

const Order = ({ ingredients: rawIngredients, price }) => {
  const ingredients = [];
  for (let ingredientName in rawIngredients) {
    ingredients.push({
      amount: rawIngredients[ingredientName],
      name: ingredientName,
    });
  }

  const ingredientsOutput = ingredients.map((ingredient) => (
    <span
      key={ingredient.name}
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px",
      }}
    >{`${ingredient.name} (${ingredient.amount}) `}</span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD {Number(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
