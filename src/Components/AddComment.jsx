import React, { Component } from "react";
import { addComments } from "../api";
import ErrorHandling from "./ErrorHandling";

class AddComment extends Component {
  state = {
    hasVoted: false,
    comment: "",
  };

  handleChange = (event) => {
    const { comment_id } = this.props;
    increaseArticleVote(comment_id).catch((err) => {
      const {
        response: { status, statusText },
      } = err;
      this.setState({
        hasError: true,
        errorMessage: `Comment not found... ${status}!! ${statusText}`,
        hasCommented: false,
        comment_change: "",
      });
    });
    this.setState({ comment_change: "", hasCommented: true });
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
          <>vote:</>
          <button onClick={this.handleClick}>👍</button>
        </div>
      );
    }
  }
}

export default ArticleVote;
