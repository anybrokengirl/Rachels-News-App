import React, { Component } from "react";
import { getSingleArticle, increaseArticleVote } from "../api";
import ErrorHandling from "./ErrorHandling";
import Loading from "./Loading";
import Comments from "./Comments";
import ArticleVote from "./ArticleVote";

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    errorMessage: "",
  };

  componentDidMount() {
    getSingleArticle(this.props.article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        this.setState({
          hasError: true,
          isLoading: false,
          errorMessage: `Article not found... ${status}!! ${statusText}`,
        });
      });
  }

  handleClick = (event) => {
    increaseArticleVote(this.state.article.article_id).catch((err) => {
      const {
        response: { status, statusText },
      } = err;
      this.setState = (currentState) => {
        const newState = {
          isLoading: false,
          hasVoted: true,
          errorMessage: `Voting not allowed... ${status}!! ${statusText}`,
          article: {
            ...currentState.article,
            votes: currentState.article.votes + 1,
          },
        };
        return newState;
      };
    });
  };

  render() {
    const { article, isLoading, hasError, errorMessage } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorHandling errorMessage={errorMessage} />;
    } else {
      return (
        <div>
          <h2>{article.title}</h2>
          <p>Topic: {article.topic}</p>
          <p>Author: {article.author}</p>
          <p>{article.created_at}</p>
          <div />
          <div>
            <p>{article.body}</p>
          </div>
          <div>
            <ArticleVote
              votes={article.votes}
              article_id={article.article_id}
            />
            <p>{article.comment_count} Comments</p>
            <Comments article_id={this.props.article_id} />
          </div>
        </div>
      );
    }
  }
}
export default SingleArticle;
