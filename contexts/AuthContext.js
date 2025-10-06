// Contexto para armazenar informações de autenticação
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export let TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT = "";

function AuthProvider({ children }) {

    const [authenticationDataLoggedInUser, setAuthenticationDataLoggedInUser] = useState(null);

    // Carrega dados do sessionStorage (se existir)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = sessionStorage.getItem("userAuthData");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setAuthenticationDataLoggedInUser(parsedUser);
                } catch (error) {
                    console.error("Erro ao parsear userAuthData do sessionStorage:", error);
                    sessionStorage.removeItem("userAuthData");
                }
            }
        }
    }, []);

    // Salva dados de autenticação
    function handleSaveAuthenticationDataLoggedInUser(userAuthenticationData) {
        setAuthenticationDataLoggedInUser(userAuthenticationData);
        sessionStorage.setItem('userAuthData', JSON.stringify(userAuthenticationData));
    }

    // Logout: limpa contexto e storage
    function handleLogout() {
        setAuthenticationDataLoggedInUser("");
        sessionStorage.removeItem('userAuthData');
    }

    // Define tipo de acesso do usuário (com fallback)
    TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT = authenticationDataLoggedInUser?.role || "";

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
