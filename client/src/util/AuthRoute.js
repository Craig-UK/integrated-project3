import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext, AuthProvider } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (

    <Route
    
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" replace/> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;