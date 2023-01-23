import React from 'react';
import {CustomThemeProps} from '../@types/CustomThemeProps';
export const defaultTheme: CustomThemeProps = {
  theme: 'light',
  toggleTheme: () => console.log('toggle'),
  colors: {},
};
export const CustomThemePreferencesContext =
  React.createContext<CustomThemeProps>(defaultTheme);
export const CustomThemePreferencesProvider =
  CustomThemePreferencesContext.Provider;
export const useCustomTheme = () => {
  return React.useContext<CustomThemeProps>(CustomThemePreferencesContext);
};
