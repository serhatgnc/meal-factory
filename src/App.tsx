import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, ListAll, Random, Navbar } from './components/AllComponents';

const About = lazy(() => import('./components/About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
              <Route path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
