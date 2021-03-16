import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const ListAll = lazy(() => import("./pages/ListAll"));
const Random = lazy(() => import("./pages/Random"));

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/all" component={ListAll} />
              <Route path="/random" component={Random} />
              <Route path="/about" component={About} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
