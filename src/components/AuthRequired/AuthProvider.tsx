import React from 'react';
import { AuthContextProvider } from "../../hooks/authContext";
import { useAppSelector } from "../../hooks/redux";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const authData = useAppSelector(state => state.auth)
    return <AuthContextProvider value={authData}>{children}</AuthContextProvider>;
}
