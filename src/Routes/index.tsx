import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import AuthRoute from './AuthenticatedRoute';

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Forgot from '../Pages/Fogot';
import Reset from '../Pages/Reset';
import Dashboard from '../Pages/Dashboard';
import Profile from '../Pages/Profile';

const Routes: FC = () => (
  <Switch>
    <AuthRoute path="/" exact component={SignIn} />
    <AuthRoute path="/signup" component={SignUp} />
    <AuthRoute path="/forgot-password" component={Forgot} />
    <AuthRoute path="/reset-password" component={Reset} />

    <AuthRoute path="/dashboard" component={Dashboard} isPrivate />
    <AuthRoute path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
