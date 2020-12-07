import React, { Component } from "react";
import { getTopics } from "../api";

class Nav extends Component {
  state = {
    topics: [],
  };

  componentDidMount() {
    getTopics();
  }
  render() {
    return <nav></nav>;
  }
}

export default Nav;
