// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [authenticationDataLoggedInUser, setauthenticationDataLoggedInUser] = useState("publico");

    function handleSaveAuthenticationDataLoggedInUser(userAuthenticationData) {
        setauthenticationDataLoggedInUser(userAuthenticationData);
        console.log("userAuthenticationData", userAuthenticationData);
    }

    return (
        <AuthContext.Provider
            value={{
                authenticationDataLoggedInUser,
                setauthenticationDataLoggedInUser,
                handleSaveAuthenticationDataLoggedInUser
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
