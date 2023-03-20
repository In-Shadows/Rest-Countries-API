import React, { useContext } from "react";
import { useRouteLoaderData } from "react-router-dom";

import "./Countries.scss";
import Country from "./Country";
import RegionContext from "../store/region-context";

const Countries = () => {
  const data = useRouteLoaderData("countries");
  const ctx = useContext(RegionContext);

  const scrollToElement = (el) => {
    // el.scrollIntoView(true);
    // ctx.changeInput("");
  };

  const displayCountries =
    ctx.region === "All Countries"
      ? data
      : data.filter((country) => country.region === ctx.region);

  return (
    <section className="countries container">
      {displayCountries.map((country, index) => (
        <Country
          key={index}
          alpha3Code={country.alpha3Code}
          flag={country.flag}
          name={country.name}
          population={country.population}
          region={country.region}
          capital={country.capital}
          alpha2Code={country.alpha2Code}
          scroll={scrollToElement}
        />
      ))}
    </section>
  );
};

export default Countries;
