import React, { Component } from "react";
import { getTopics } from "../api";
import { Link } from "@reach/router";

class Nav extends Component {
  state = {
    topics: [],
  };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics });
    });
  }
  render() {
    const { topics } = this.state;
    console.log(topics);
    return (
      <nav>
        {topics.map((topic) => (
          <Link key={topic.slug} to={`/topics/${topic.slug}`}>
            <p>{topic.slug}</p>
          </Link>
        ))}
      </nav>
    );
  }
}

export default Nav;
