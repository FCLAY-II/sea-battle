import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function NotAuthRoute({ children, ...rest }) {
  const userLogin = useSelector((state) => state.user.login);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !userLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default NotAuthRoute;
