import React, { useState } from "react";
import { IoMoonOutline } from "react-icons/io5";

import classes from "./Header.scss";

const Header = () => {
  let styles;
  const [theme, setTheme] = useState(false);

  const themeHandler = () => {
    setTheme((prev) => !prev);
  };

  if (theme === true) {
    styles = { stroke: "#fff" };
  }

  return (
    <div className="header-con">
      <header className="header container">
        <h1 className="primary-heading">Where in the world?</h1>

        <div className="header__dark-mode">
          <input
            type="checkbox"
            id="dark-mode"
            defaultChecked={theme ? true : false}
          />
          <label htmlFor="dark-mode" onClick={themeHandler}>
            <IoMoonOutline style={styles} />
            <span>Dark Mode</span>
          </label>
        </div>
      </header>
    </div>
  );
};

export default Header;
