import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';

function NotAuthRoute({ children, ...rest }) {

  const { isAuth } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
      !isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default NotAuthRoute;
