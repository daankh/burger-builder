import React, { Fragment } from "react";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";

const SideDrawer = ({ open, closed }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Fragment>
      <BackDrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
