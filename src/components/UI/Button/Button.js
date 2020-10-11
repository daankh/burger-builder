import React from "react";
import classes from "./Button.module.css";

const Button = ({ children, clicked, btnType, disabled }) => (
  <button
    className={[classes.Button, classes[btnType]].join(" ")}
    onClick={clicked}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
