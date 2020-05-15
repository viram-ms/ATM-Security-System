import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {ProtectedRoute} from './ProtectedRoute';
import Admin from "layouts/Admin.jsx";
import Login from "layouts/Login.jsx";
import "assets/css/material-dashboard-react.css?v=1.6.0";
const hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={Login} />
      {/* <Redirect from="/" to="/" /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
