import axios from "axios";

const rachelsNewsAppApi = axios.create({
  baseURL: "https://rachels-news-app.herokuapp.com/api",
});

export const getTopics = () => {
  return rachelsNewsAppApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const getArticles = (topic) => {
  return rachelsNewsAppApi
    .get("/articles", {
      params: {
        topic,
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

export const getCommentsByArticleId = (article_id) => {
  return rachelsNewsAppApi
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => {
      // console.log(data.comments[0], "<--- comments");

      return data.comments;
    });
};

export const increaseArticleVote = (article_id) => {
  return rachelsNewsAppApi.patch(`/article/${article_id}`, { vote: 1 });
};
