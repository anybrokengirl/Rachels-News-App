import { Router } from "@reach/router";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Router>
        {/* <Topics path="/topics/:slug" /> */}
        <Articles path="/articles" />
      </Router>
    </div>
  );
};

export default App;
