import React, { Component } from "react";
import { getSingleArticle } from "../api";
import ErrorHandling from "./ErrorHandling";
import Loading from "./Loading";
import Comments from "./Comments";

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

  render() {
    const { article, isLoading, hasError, errorMessage } = this.state;
    console.log(this.props.article_id);
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
            <p> ⭐{article.votes}</p>
            <p>{article.comment_count} Comments</p>
            <Comments article_id={this.props.article_id} />
          </div>
        </div>
      );
    }
  }
}
export default SingleArticle;
