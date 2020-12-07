import React, { Component } from "react";
import { getArticles } from "../api";

class Articles extends Component {
  state = {
    articles: [],
  };
  componentDidMount() {
    const { article_id } = this.props;
    getArticles(article_id).then((articles) => {
      this.setState({ articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    getArticles(this.props.article_id).then((articles) => {
      this.setState({ articles });
    });
  }

  render() {
    const { articles, article_id } = this.props;

    return (
      <div>
        <h2>{articles.article_id}</h2>
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.article_id}>
                <h2>{article.title}</h2>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Articles;
