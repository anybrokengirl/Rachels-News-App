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
    return (
      <nav>
        <ul>
          {topics.map((topic) => {
            return (
              <Link key={topic.slug} to={`/articles/${topic.slug}`}>
                <h2>{topic.slug}</h2>
              </Link>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Nav;
