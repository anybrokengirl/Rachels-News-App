import React, { Component } from "react";
import { getArticles } from "../api";
import { Link } from "@reach/router";
import Loading from "./Loading";
import ErrorHandling from "./ErrorHandling";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    hasError: false,
    errorMessage: "",
  };
  componentDidMount() {
    const { topic } = this.props;
    getArticles(topic)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
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

  componentDidUpdate(prevProps, prevState) {
    const newTopic = prevProps.topic !== this.props.topic;
    if (newTopic) {
      getArticles(this.props.topic).then((articles) => {
        this.setState({ articles });
      });
    }
  }

  render() {
    const { articles, isLoading } = this.state;
    const { topic, hasError, errorMessage } = this.props;

    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorHandling errorMessage={errorMessage} />;
    } else {
      return (
        <div>
          <h2>{topic}</h2>
          <ul>
            {articles.map((article) => {
              return (
                <li key={article.article_id}>
                  <Link to={`/article/${article.article_id}`}>
                    <h2>{article.title}</h2>
                  </Link>
                  <p>Author: {article.author}</p>
                  <p>Votes: {article.votes}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default Articles;
