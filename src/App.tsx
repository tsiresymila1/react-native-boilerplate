import React, {useEffect, ReactNode as AppNode} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './routes/RouteNavigation';
import Constant from './helpers/constant';
import {CustomThemePreferencesProvider} from './config/theme';
import {CustomThemeProps} from './@types/CustomThemeProps';
import {persist, store} from './redux/store';
import {ModalLoader} from './components/ModalLoader';
// @ts-ignore
import {API_URL} from '@env';
import {ModalError} from './components/ModalError';
import {SafeAreaView} from 'react-native';

// end configuration translate
const App: React.FC<AppNode> = () => {
  //Start Config theme
  const scheme = useColorScheme();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(
    scheme === 'dark' ? 'dark' : 'light',
  );
  const themePreference = React.useMemo<CustomThemeProps>(
    () => ({
      theme,
      toggleTheme,
      colors: {},
    }),
    [theme],
  );
  const toggleTheme = () => {
    setTheme(previous => (previous === 'light' ? 'dark' : 'light'));
  };
  //navigation theme
  const NavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Constant.baseColor,
    },
  };
  //End Config theme

  useEffect(() => {
    async function updateNativeNavigationColor() {
      // set bottom tab color
      await SystemNavigationBar.setNavigationColor(Constant.baseColor, 'light');
    }
    updateNativeNavigationColor().then(r => {
      console.log(r, API_URL);
    });
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <CustomThemePreferencesProvider value={themePreference}>
          <SafeAreaProvider>
            <PaperProvider>
              <SafeAreaView className="w-full h-full">
                {/* <StatusBar
                  barStyle={
                    theme === 'dark' ? 'light-content' : 'light-content'
                  }
                  backgroundColor={Constant.baseColor}
                /> */}
                <NavigationContainer theme={NavigationTheme}>
                  <RootNavigation />
                </NavigationContainer>
                <ModalLoader />
                <ModalError />
              </SafeAreaView>
            </PaperProvider>
          </SafeAreaProvider>
        </CustomThemePreferencesProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
