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
            <Route path="/all">
              <ListAll />
            </Route>
            <Route path="/random">
              <Random />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
