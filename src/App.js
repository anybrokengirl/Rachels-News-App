import { Router } from "@reach/router";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import "./App.css";
import ErrorHandling from "./Components/ErrorHandling";
import Comments from "./Components/Comments";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Router>
        <Articles path="/" />
        <SingleArticle path="/article/:article_id" />
        <Articles path="/articles/:topic" />
        <Comments path="/articles/:article_id/comment" />
        <ErrorHandling default errorMessage="Page not found! 😞" />
      </Router>
    </div>
  );
};

export default App;
