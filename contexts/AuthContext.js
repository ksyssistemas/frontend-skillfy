// Contexto para armazenar informações de autenticação
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export let TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT = "";

function AuthProvider({ children }) {

    const [authenticationDataLoggedInUser, setAuthenticationDataLoggedInUser] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
          const storedUser = sessionStorage.getItem("userAuthData");
          if (storedUser) {
            setAuthenticationDataLoggedInUser(JSON.parse(storedUser));
          }
        }
      }, []);
      

    function handleSaveAuthenticationDataLoggedInUser(userAuthenticationData) {
        setAuthenticationDataLoggedInUser(userAuthenticationData);
        sessionStorage.setItem('userAuthData', JSON.stringify(userAuthenticationData));
    }

    function handleLogout() {
        setAuthenticationDataLoggedInUser("");
        sessionStorage.removeItem('userAuthData');
    }    

    TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT = authenticationDataLoggedInUser.role;

    return (
        <AuthContext.Provider
            value={{
                authenticationDataLoggedInUser,
                setAuthenticationDataLoggedInUser,
                handleSaveAuthenticationDataLoggedInUser,
                handleLogout
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
