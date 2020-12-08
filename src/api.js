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
