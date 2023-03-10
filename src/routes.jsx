import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import SheetRPG from './pages/SheetRPG'
import Login from './pages/login/Login';
import SignUp from './pages/login/Signup';
import { AuthProvider } from './auth/AuthContext';
import { PrivateRoute } from './auth/PrivateRouter';
import Section from './pages/Section';

function Routes() {
  let id = window.location.href.split("/")[4];

  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path={`/record/${id}`} component={SheetRPG} />
        <PrivateRoute exact path={`/section/${id}`} component={Section} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
      </Router>
    </AuthProvider>
  );
}

export default Routes;
