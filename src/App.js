import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import KapexSwap from './pages/KapexSwap'
import AdminDashboard from "./pages/AdminDashboard";
import UserDetails from "./pages/UserDetails";
import AdminLogin from "./pages/AdminLogin";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/swap" component={KapexSwap} />
          <Route path="/login" component={AdminLogin} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/users" component={UserDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
