import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/_base.scss";
import { RootLayout, HomePage, CountryDetailsPage, ErrorPage } from "./pages";

const loadCountries = async function () {
  const response = await fetch("/data.json");
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  const data = await response.json();
  return data;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "countries",
    loader: loadCountries,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":country",
        element: <CountryDetailsPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
