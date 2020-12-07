import axios from "axios";

const rachelsNewsAppApi = axios.create({
  baseURL: "https://rachels-news-app.herokuapp.com/api",
});

export const getTopics = () => {
  return rachelsNewsAppApi.get("/topics").then(({ data }) => {
    console.log(data);
    return data.topics;
  });
};
