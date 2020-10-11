import React from "react";
import classes from "./Input.module.css";

const Input = ({
  elementType,
  elementConfig,
  value,
  changed,
  invalid,
  shouldValidate,
  touched,
}) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (elementType) {
    case "input":
      inputElement = (
        <input
          onChange={changed}
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={changed}
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={changed}
          className={inputClasses.join(" ")}
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
