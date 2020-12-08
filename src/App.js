import { Router } from "@reach/router";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Router>
        <Articles path="/" />
        {/* <Articles path="/article/:article_id" /> */}
        <Articles path="/articles/:topic" />
      </Router>
    </div>
  );
};

export default App;
