import React, { Fragment } from "react";

const Layout = ({ children }) => (
  <Fragment>
    <div>Toolbar, SideDrawer, BackDrop</div>
    <main>{children}</main>
  </Fragment>
);

export default Layout;
