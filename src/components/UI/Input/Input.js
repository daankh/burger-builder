import React from "react";
import classes from "./Input.module.css";

const Input = ({ elementType, elementConfig, value, changed }) => {
  let inputElement = null;

  switch (elementType) {
    case "input":
      inputElement = (
        <input
          onChange={changed}
          className={classes.InputElement}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={changed}
          className={classes.InputElement}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={changed}
          className={classes.InputElement}
          value={value}
        >
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...elementConfig}
          value={value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{elementConfig.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
