import React, { Component } from "react";
import { getCommentsByArticleId } from "../api";
import ErrorHandling from "./ErrorHandling";
import Loading from "./Loading";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    hasError: false,
    errorMessage: "",
  };

  componentDidMount() {
    getCommentsByArticleId(this.props.article_id)
      .then((comments) => {
        this.setState({ comments: comments, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        this.setState({
          hasError: true,
          isLoading: false,
          errorMessage: `Comment not found... ${status}!! ${statusText}`,
        });
      });
  }

  render() {
    const { comments, isLoading, hasError, errorMessage } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorHandling errorMessage={errorMessage} />;
    } else {
      return (
        <main>
          {comments.map((comment) => (
            <p key={comment.comment_id}>{comment.body}</p>
          ))}
        </main>
      );
    }
  }
}

export default Comments;
