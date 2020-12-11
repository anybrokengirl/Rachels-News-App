import React, { Component } from "react";
import { getArticles } from "../api";
import { Link } from "@reach/router";
import Loading from "./Loading";
import ErrorHandling from "./ErrorHandling";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "article_id",
    order: "asc",
    hasError: false,
    errorMessage: "",
  };
  componentDidMount() {
    const { topic } = this.props;
    const { sort_by, order } = this.state;
    getArticles(topic, sort_by, order)
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
    const newSortOrder = prevState.order !== this.state.order;
    if (newTopic) {
      this.setState({
        isLoading: true,
      });
      getArticles(this.props.topic).then((articles) => {
        this.setState({ articles, isLoading: false });
      });
    }
    if (newSortOrder) {
      getArticles(this.props.topic, this.state.sort_by, this.state.order).then(
        (articles) => {
          this.setState({ articles, isLoading: false });
        }
      );
    }
  }

  handleChange = (event) => {
    const newOrder = event.target.value;
    this.setState({ order: newOrder });
  };

  render() {
    const { articles, isLoading, hasError, errorMessage } = this.state;
    const { topic } = this.props;

    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorHandling errorMessage={errorMessage} />;
    } else {
      return (
        <div>
          <h2>{topic}</h2>

          <div>
            <select onChange={this.handleChange}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
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
        </div>
      );
    }
  }
}

export default Articles;
