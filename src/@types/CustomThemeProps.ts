export type CustomThemeProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: Record<string, any>;
};
