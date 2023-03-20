import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";

import "./CountryDescription.scss";
import Button from "./ui/Button";

const CountryDescription = () => {
  const params = useParams();
  const data = useRouteLoaderData("countries");
  const styles = {
    width: "2rem",
    height: "2rem",
    color: "currentColor",
    marginRight: "1rem",
  };

  const country = data.find((country) => country.alpha3Code === params.country);
  const languages = country.languages
    .reduce((acc, lang) => {
      acc.push(lang.name);
      return acc;
    }, [])
    .join(", ");

  const borderCountryNamesAndCodes = country.borders?.reduce((acc, code) => {
    const borderCountry = data.find((con) => con.alpha3Code === code);
    const index = borderCountry.name.indexOf("(");

    acc.push({
      name:
        index !== -1
          ? borderCountry.name.slice(0, index - 1)
          : borderCountry.name,

      code: borderCountry.alpha3Code,
    });

    return acc;
  }, []);

  const borderCountries = borderCountryNamesAndCodes
    ? borderCountryNamesAndCodes.slice(0, 3).map((borCon, index) => (
        <Button key={index} link={`/${borCon.code}`}>
          {borCon.name}
        </Button>
      ))
    : "None";

  return (
    <section className="country-description">
      <div className="container">
        <div className="country-description__btn-con">
          <Button link="/">
            <BsArrowLeft style={styles} />
            Back
          </Button>
        </div>
        <div className="country-description__con">
          <div className="country-description__flag">
            <img src={country.flag} alt="flag" />
          </div>

          <div className="country-description__details-con">
            <h2 className="secondary-heading country-description__heading">
              {country.name}
            </h2>

            <div className="country-description__details">
              <p>
                Native Name: <span>{country.nativeName}</span>
              </p>
              <p>
                Population: <span>{country.population}</span>
              </p>
              <p>
                Region: <span>{country.region}</span>
              </p>
              <p>
                Sub Region: <span>{country.subregion}</span>
              </p>
              <p>
                Capital: <span>{country.capital}</span>
              </p>
              <p>
                Top Level Domain: <span>{country.topLevelDomain[0]}</span>
              </p>
              <p>
                Currencies: <span>{country.currencies[0].name}</span>
              </p>
              <p>
                Languages: <span>{languages}</span>
              </p>
            </div>

            <div className="country-description__border">
              <p className="country-description__border-text">
                Border Countries:
              </p>
              <div className="country-description__border-c">
                {borderCountries}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryDescription;
