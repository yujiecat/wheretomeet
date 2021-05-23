import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Home from './pages/homepage'
import Login from './pages/signinpage'
import Register from './pages/signuppage'

function App() {
  return (
    <Router>
        <div style={{height: "100vh", alignItems: "stretch" }}>
            <div>
                <div className="navigationBar">
                    <Link className="navButton" to="/">Home</Link>
                    <Link className="navButton" to="/login">Login</Link>
                    <Link className="navButton" to="/register">Register</Link>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                </Switch>
            </div>
        </div>
    </Router>
  );
}

export default App;