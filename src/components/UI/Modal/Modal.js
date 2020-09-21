import React, { Fragment } from "react";
import BackDrop from "../BackDrop/BackDrop";
import classes from "./Modal.module.css";

const Modal = ({ children, show, modalClosed }) => {
  return (
    <Fragment>
      <BackDrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translate(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default Modal;
