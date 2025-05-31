import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Categories from "../components/Categories.jsx";
import "../index.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <Categories />
      <Link className="links" to="/catalogue">
        Go to Catalogue
      </Link>
    </div>
  );
};

export default Homepage;
