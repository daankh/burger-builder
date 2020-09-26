import React, { Component, Fragment } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    console.log("fired closed");
    this.setState({
      showSideDrawer: false,
    });
  };

  sideDrawerOpenedHandler = () => {
    this.setState({
      showSideDrawer: true,
    });
  };

  render() {
    const { children } = this.props;
    const { showSideDrawer } = this.state;
    return (
      <Fragment>
        <Toolbar opened={this.sideDrawerOpenedHandler} />
        <SideDrawer
          open={showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{children}</main>
      </Fragment>
    );
  }
}

export default Layout;
