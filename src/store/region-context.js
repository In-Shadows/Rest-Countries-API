import React, { useState } from "react";

const RegionContext = React.createContext({
  region: "",
  changeRegion: (region) => {},
  input: "",
  changeInput: (country) => {},
});

export const RegionContextProvider = (props) => {
  const [region, setRegion] = useState("All Countries");
  const [input, setInput] = useState("");

  const switchRegion = (region) => {
    setRegion(region);
  };

  const switchInput = (country) => {
    setInput(country);
  };

  return (
    <RegionContext.Provider
      value={{
        region,
        changeRegion: switchRegion,
        input,
        changeInput: switchInput,
      }}
    >
      {props.children}
    </RegionContext.Provider>
  );
};

export default RegionContext;
