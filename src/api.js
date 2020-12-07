import axios from "axios";

const rachelsNewsAppApi = axios.create({
  baseURL: "https://rachels-news-app.herokuapp.com/api",
});

export const getTopics = () => {
  return rachelsNewsAppApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const getArticles = (article_id) => {
  return rachelsNewsAppApi
    .get("/articles", {
      params: {
        articles: article_id,
      },
    })
    .then(({ data }) => {
      console.log(data);
      return data.articles;
    });
};
