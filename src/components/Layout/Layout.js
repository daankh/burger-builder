import React, { Fragment } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

const Layout = ({ children }) => (
  <Fragment>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>{children}</main>
  </Fragment>
);

export default Layout;
