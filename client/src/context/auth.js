import React, { useReducer, createContext } from 'react';

const AuthContext = createContext({
    usser: null,
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
    const [state, dispatch] = useReducer(authReducer, { user: null }) // Takes a reducer and returns a state and a dispatch. Initial state of the reducer is "user: null".

    function login(userData) {
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
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