import axios from "axios";

const rachelsNewsAppApi = axios.create({
  baseURL: "https://rachels-news-app.herokuapp.com/api",
});

export const getTopics = () => {
  return rachelsNewsAppApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const getArticles = (topic, sort_by, order) => {
  return rachelsNewsAppApi
    .get("/articles", {
      params: {
        topic,
        sort_by,
        order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getSingleArticle = (article_id) => {
  return rachelsNewsAppApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentsByArticleId = (article_id, sort_by, order) => {
  return rachelsNewsAppApi
    .get(`/articles/${article_id}/comments`, {
      params: {
        article_id,
        sort_by,
        order,
      },
    })
    .then(({ data }) => {
      return data.comments;
    });
};

export const increaseArticleVote = (article_id) => {
  return rachelsNewsAppApi.patch(`/articles/${article_id}`, { inc_votes: 1 });
};

export const postComment = (newComment, article_id) => {
  return rachelsNewsAppApi
    .post(`/articles/${article_id}/comments`, newComment)
    .then(({ data }) => {});
};

// export const deleteComment = (noMoreComment, article_id) => {
//   return rachelsNewsAppApi
// }
