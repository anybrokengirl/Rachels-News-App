import React from "react";
import { Link } from "@reach/router";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Up-to-date News</h1>
      </Link>
      <p>Your resource for the newest news</p>
    </header>
  );
};

export default Header;
