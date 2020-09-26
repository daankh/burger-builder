import React, { Component, Fragment } from "react";
import BackDrop from "../BackDrop/BackDrop";
import classes from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.show !== this.props.show) {
      return true;
    }
    return false;
  }

  render() {
    const { children, show, modalClosed } = this.props;
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
  }
}

export default Modal;
