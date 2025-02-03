import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
    const context = useContext(AuthContext);
    console.log("contex do useAuth :", context);
    return context;
}