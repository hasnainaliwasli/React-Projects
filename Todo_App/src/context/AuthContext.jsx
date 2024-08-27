import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from 'config/firebase';


// Create a context for authentication
const AuthContext = createContext();

// Define the initial state
const initialState = { isAuthenticated: false };

// Define the reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { isAuthenticated: true, user: action.payload };
        case 'LOGOUT':
            return { isAuthenticated: false };
        default:
            return state;
    }
};

// Create a provider component
export default function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'LOGIN', payload: { user } })
            }
            // else {
            //     console.log("User is Looged out");
            // }
        });

    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the authentication context
export const useAuthContext = () => useContext(AuthContext);
