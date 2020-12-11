import React, { Component } from "react";
import { postComment } from "../api";
// import ErrorHandling from "./ErrorHandling";

class AddComment extends Component {
  state = {
    comment: "",
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { comment } = this.state;
    const { addComment } = this.props;
    event.preventDefault();
    addComment({ body: comment, username: "jessjelly" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Comment here:
            <textarea
              type="text"
              name="comment"
              onChange={this.handleChange}
              value={this.state.comment}
            ></textarea>
          </label>
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
}

export default AddComment;
