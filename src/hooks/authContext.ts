import * as React from 'react';
import { AuthState } from '../@types';

const AuthContext = React.createContext<AuthState>(null!);
export const AuthContextProvider = AuthContext.Provider;
export const useAuth = () => {
  return React.useContext(AuthContext);
};
