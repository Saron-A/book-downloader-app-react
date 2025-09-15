import React from "react";
import "../index.css";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/categories">Categories</a>
          </li>
          <li>
            <a href="/catalogue">Catalogue</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>

      <h1>Welcome to BookDownloader App</h1>
      <p>The perfect, comfy and resourceful burrow for bookworms!</p>
    </div>
  );
};

export default Header;
