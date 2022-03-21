import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken')); // Decode the current jwt token.

    // If the current jwt token has expired.
    if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken'); // Remove the jwt token from local storage.
    } else {
        initialState.user = decodedToken; // Else, the user object within the initialState variable is set to the decoded jwt token.
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

// A Reducer receives a state and action with a type and a payload and determines what to do with those depending on the functionality of the application.
function authReducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState) // Takes a reducer and returns a state and a dispatch. Initial state of the reducer is "user: null".

    function login(userData) {
        localStorage.setItem("jwtToken", userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        dispatch({ type: 'LOGOUT'})
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout}}
            {...props}
            />
    )
}

export { AuthContext, AuthProvider}