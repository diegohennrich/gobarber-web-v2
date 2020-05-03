import React, { FC, ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuth } from '../Hooks/Auth';

interface AuthProps extends RouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

const AuthRoute: FC<AuthProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth(); // vai pegar os dados do user autenticado

  return (
    <Route
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard' }} />
        );
      }}
    />
  );
};

export default AuthRoute;
