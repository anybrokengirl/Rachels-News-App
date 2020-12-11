import React from "react";
import { Link } from "@reach/router";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1 class="header">Up-to-date News</h1>
      </Link>
      <p id="tagline">Your resource for the newest news</p>
    </header>
  );
};

export default Header;
