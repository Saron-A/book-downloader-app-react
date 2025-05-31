import React from "react";
import Homepage from "./pages/Homepage";
import Catalogue from "./pages/Catalogue";
import Layout from "./pages/Layout";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/homepage",
        element: <Homepage />,
      },
      {
        path: "/catalogue",
        element: <Catalogue />,
      },
    ],
  },
];

export default routes;
