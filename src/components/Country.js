import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "./Country.scss";
import RegionContext from "../store/region-context";

const Country = (props) => {
  const inputRef = useRef();
  const ctx = useContext(RegionContext);
  const formattedPopulation = new Intl.NumberFormat(navigator.language, {
    useGrouping: true,
  }).format(props.population);

  useEffect(() => {
    if (ctx.input.alpha2Code === props.alpha2Code) {
      props.scroll(inputRef.current);
    }
  }, [ctx.input, props, inputRef]);
  return (
    <Link
      to={`/${props.alpha3Code}`}
      className="country"
      id={props.alpha2Code}
      ref={inputRef}
    >
      <div className="country__img">
        <img src={props.flag} alt="flag" />
      </div>
      <div className="country__description">
        <h3 className="tertiary-heading">{props.name}</h3>
        <div className="country__details">
          <p>
            Population: <span>{formattedPopulation}</span>
          </p>
          <p>
            Region: <span>{props.region}</span>
          </p>
          <p>
            Capital: <span>{props.capital}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Country;
