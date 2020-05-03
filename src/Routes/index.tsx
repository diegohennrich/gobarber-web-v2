import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import AuthRoute from './AuthenticatedRoute';

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard';

const Routes: FC = () => (
  <Switch>
    <AuthRoute path="/" exact component={SignIn} />
    <AuthRoute path="/signup" component={SignUp} />

    <AuthRoute path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
