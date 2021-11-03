import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {

  const userLogin = useSelector((state) => state.user.login);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
