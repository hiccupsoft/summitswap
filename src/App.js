import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import KapexSwap from './pages/KapexSwap'
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/swap" component={KapexSwap} />
          <Route path="/admin" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
