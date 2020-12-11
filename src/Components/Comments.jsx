import React, { Component } from "react";
import { getCommentsByArticleId, postComment } from "../api";
import AddComment from "./AddComment";

import Loading from "./Loading";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    sort_by: "created_at",
    order: "asc",
  };

  componentDidMount() {
    const { sort_by, order } = this.state;

    getCommentsByArticleId(this.props.article_id, sort_by, order).then(
      (comments) => {
        this.setState({ comments: comments, isLoading: false });
      }
    );
  }

  componentDidUpdate(prevState) {
    const newSortOrder = prevState.order !== this.state.order;
    if (newSortOrder) {
      getCommentsByArticleId(this.props.article_id).then((comments) => {
        this.setState({ comments: comments, isLoading: false });
      });
    }
  }

  addComment = (commentToAdd) => {
    const { article_id } = this.props;
    console.log(article_id);
    postComment(commentToAdd, article_id);
  };

  handleChange = (event) => {
    const newOrder = event.target.value;
    this.setState({ order: newOrder });
  };

  render() {
    const { comments, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <main>
          <div>
            <AddComment addComment={this.addComment} />
            <select onChange={this.handleChange}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          {comments.map((comment) => (
            <p key={comment.comment_id}>{comment.body}</p>
          ))}
        </main>
      );
    }
  }
}

export default Comments;
