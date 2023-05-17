import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Create from "./components/Create";
import NotFound from "./components/NotFound";
import Admin from "./components/Admin";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import Userdashboard from "./components/Userdashboard";

function App() {
  // isAuthenticated prevents unwanted redirects to home when the user is already logged in.
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated")) ?? false
  );

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login setIsAuthenticated={setIsAuthenticated} />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/create">
            <Create />
          </Route>

          <ProtectedRoute
            exact
            path="/userdashboard"
            component={Userdashboard}
            isAuthenticated={isAuthenticated}
          />

          <ProtectedRoute
            exact
            path="/admin"
            component={Admin}
            isAuthenticated={isAuthenticated} 
          />

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
