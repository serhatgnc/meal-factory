import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  About,
  Home,
  ListAll,
  Random,
  Navbar,
} from "./components/AllComponents";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/all">
              <ListAll />
            </Route>
            <Route exact path="/random">
              <Random />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
