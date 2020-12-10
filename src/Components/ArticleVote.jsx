import React, { Component } from "react";
import { increaseArticleVote } from "../api";
import ErrorHandling from "./ErrorHandling";

class ArticleVote extends Component {
  state = {
    hasVoted: false,
    vote_count: 0,
  };

  handleClick = (event) => {
    const { article_id } = this.props;
    increaseArticleVote(article_id).catch((err) => {
      const {
        response: { status, statusText },
      } = err;
      this.setState({
        hasError: true,
        errorMessage: `Article not found... ${status}!! ${statusText}`,
        hasVoted: false,
        vote_change: 0,
      });
    });
    this.setState({ vote_count: 1, hasVoted: true });
  };

  render() {
    const { votes } = this.props;
    const { vote_count, hasError, errorMessage } = this.state;

    if (hasError) {
      return <ErrorHandling errorMessage={errorMessage} />;
    } else {
      return (
        <div>
          <p>{votes + vote_count}</p>
          <button onClick={this.handleClick}>vote!</button>
        </div>
      );
    }
  }
}

export default ArticleVote;
