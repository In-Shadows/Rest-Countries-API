import React, { useState, useContext, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

import RegionContext from "../store/region-context";

import "./Form.scss";

const restrictions = ["of", "and"];

const formatString = (str) => {
  return str.length <= 3
    ? str.toUpperCase()
    : str
        .trimStart()
        .toLowerCase()
        .split(" ")
        .map((s) =>
          restrictions.includes(s) ? s : s[0].toUpperCase().concat(s.slice(1))
        )
        .join(" ");
};

const Form = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [inputCountry, setInputCountry] = useState("");
  const [dropdownState, setdropdownState] = useState(false);
  const [error, setError] = useState(false);
  const data = useRouteLoaderData("countries");
  const ctx = useContext(RegionContext);
  let errorText = "Country Not Found!";

  const searchStyles = {
    height: "3rem",
    width: "3rem",
    color: "var(--color-input)",
  };
  const dropdownStyles = {
    height: "3rem",
    width: "3rem",
    color: "var(--color-text)",
  };

  const changeHandler = (e) => {
    setInputCountry(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const countryName = inputCountry && formatString(inputCountry);
    setInputCountry("");
    formRef.current.blur();
    const country = data.find(
      (con) =>
        con.name === countryName ||
        con.name.includes(`${countryName} `) ||
        con.alpha2Code === countryName ||
        con.alpha3Code === countryName ||
        con.altSpellings?.includes(countryName)
    );
    if (!country) {
      setError(true);
      return;
    }

    if (!error && countryName) {
      ctx.changeRegion("All Countries");
    }

    setError(false);
    ctx.changeInput(country);
    navigate(`/${country.alpha3Code}`);
  };

  const selectContainerClickHandler = () => {
    setdropdownState((prev) => !prev);
  };

  const radioClickHandler = (e) => {
    const filterRegion = e.target.value;
    if (filterRegion) {
      ctx.changeRegion(filterRegion);
      setdropdownState(false);
    }
  };

  return (
    <form className="form container" onSubmit={formSubmitHandler}>
      <div className="form__input-container">
        <AiOutlineSearch style={searchStyles} className="form__search-icon" />
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={changeHandler}
          value={inputCountry}
          className="form__country-input"
          ref={formRef}
        />
        {error && <p className="error-text">{errorText}</p>}
      </div>

      <div
        className="form__select-container"
        onClick={selectContainerClickHandler}
      >
        <p>{ctx.region}</p>
        <RiArrowDropDownLine
          style={dropdownStyles}
          className="form__arrow-down"
        />
      </div>

      <div
        className={`form__radios ${dropdownState ? "active" : ""}`}
        onClick={radioClickHandler}
      >
        <div className="form__radio">
          <input
            type="radio"
            value="All Countries"
            id="All-Countries"
            name="region"
            checked={ctx.region === "All Countries" ? true : false}
            readOnly
          />
          <label htmlFor="All-Countries">All Countries</label>
        </div>
        <div className="form__radio">
          <input
            type="radio"
            value="Africa"
            id="Africa"
            name="region"
            checked={ctx.region === "Africa" ? true : false}
            readOnly
          />
          <label htmlFor="Africa">Africa</label>
        </div>
        <div className="form__radio">
          <input
            type="radio"
            value="Americas"
            id="Americas"
            name="region"
            checked={ctx.region === "Americas" ? true : false}
            readOnly
          />
          <label htmlFor="Americas">Americas</label>
        </div>
        <div className="form__radio">
          <input
            type="radio"
            value="Asia"
            id="Asia"
            name="region"
            checked={ctx.region === "Asia" ? true : false}
            readOnly
          />
          <label htmlFor="Asia">Asia</label>
        </div>
        <div className="form__radio">
          <input
            type="radio"
            value="Europe"
            id="Europe"
            name="region"
            checked={ctx.region === "Europe" ? true : false}
            readOnly
          />
          <label htmlFor="Europe">Europe</label>
        </div>
        <div className="form__radio">
          <input
            type="radio"
            value="Oceania"
            id="Oceania"
            name="region"
            checked={ctx.region === "Oceania" ? true : false}
            readOnly
          />
          <label htmlFor="Oceania">Oceania</label>
        </div>
        <div className="form__radio">
          <input
            type="radio"
            value="Antarctic"
            id="Antarctic"
            name="region"
            checked={ctx.region === "Antarctic" ? true : false}
            readOnly
          />
          <label htmlFor="Antarctic">Antarctic</label>
        </div>
        <div className="form__radio">
          <input
            type="radio"
            value="Antarctic Ocean"
            id="Antarctic Ocean"
            name="region"
            checked={ctx.region === "Antarctic Ocean" ? true : false}
            readOnly
          />
          <label htmlFor="Antarctic Ocean">Antarctic Ocean</label>
        </div>
        <div className="form__radio">
          <input
            type="radio"
            value="Polar"
            id="Polar"
            name="region"
            checked={ctx.region === "Polar" ? true : false}
            readOnly
          />
          <label htmlFor="Polar">Polar</label>
        </div>
      </div>
    </form>
  );
};

export default Form;
