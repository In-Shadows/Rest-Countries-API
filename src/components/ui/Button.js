import React from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

const Button = (props) => {
  return (
    <Link to={props.link} className={`btn`}>
      {props.children}
    </Link>
  );
};
export default Button;
