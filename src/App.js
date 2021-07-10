import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import KapexSwap from './pages/KapexSwap'
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/swap" component={KapexSwap} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
