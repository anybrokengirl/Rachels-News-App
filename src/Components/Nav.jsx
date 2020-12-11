import React, { Component } from "react";
import { getTopics } from "../api";
import { Link } from "@reach/router";
import Loading from "./Loading";
import ErrorHandling from "./ErrorHandling";

class Nav extends Component {
  state = {
    topics: [],
    isLoading: true,
    hasError: false,
    errorMessage: "",
  };

  componentDidMount() {
    getTopics()
      .then((topics) => {
        this.setState({ topics, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        this.setState({
          hasError: true,
          isLoading: false,
          errorMessage: `Topic not found... ${status}!! ${statusText}`,
        });
      });
  }
  render() {
    const { topics, isLoading, hasError, errorMessage } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorHandling errorMessage={errorMessage} />;
    } else {
      return (
        <nav>
          <ul>
            {topics.map((topic) => {
              return (
                <Link key={topic.slug} to={`/articles/${topic.slug}`}>
                  <h2 id="topics">{topic.slug}</h2>
                </Link>
              );
            })}
          </ul>
        </nav>
      );
    }
  }
}

export default Nav;
