import React, { Component } from "react";
import { getArticles, getArticlesByTopic } from "../api";

class Articles extends Component {
  state = {
    articles: [],
  };
  componentDidMount() {
    const { topic } = this.props;
    getArticles(topic).then((articles) => {
      this.setState({ articles });
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
    const { articles } = this.state;
    const { topic } = this.props;
    console.log(this.props);
    return (
      <div>
        <h2>{topic}</h2>
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
