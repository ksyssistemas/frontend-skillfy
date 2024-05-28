// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

export let TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT = "";

function AuthProvider({ children }) {

    const [authenticationDataLoggedInUser, setAuthenticationDataLoggedInUser] = useState("");

    function handleSaveAuthenticationDataLoggedInUser(userAuthenticationData) {
        setAuthenticationDataLoggedInUser(userAuthenticationData);
    }

    TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT = authenticationDataLoggedInUser.role;

    return (
        <AuthContext.Provider
            value={{
                authenticationDataLoggedInUser,
                setAuthenticationDataLoggedInUser,
                handleSaveAuthenticationDataLoggedInUser
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
