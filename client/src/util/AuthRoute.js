import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
    const { user } = useContext(AuthContext);

    // If user is logged in and tries to access an AuthRoute route, they will be redirected to the home page.
    return (
        <Routes>
            <Route
                {...rest}
                render={props => 
                user ? <Navigate to="/"/> : <Component {...props}/>
            }
            />
        </Routes>
    )
}

export default AuthRoute;