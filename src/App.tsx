import React, {useEffect, ReactNode as AppNode} from 'react';
import {Provider as PaperProvider, configureFonts} from 'react-native-paper';
import {Platform, StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {
  NavigationContainer,
  DefaultTheme,
  Theme as NavTheme,
} from '@react-navigation/native';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from '@/routes/RouteNavigation';
import Constant from '@/helpers/constant';
import {CustomThemePreferencesProvider} from '@/config/theme';
import {CustomThemeProps} from '@/@types/CustomThemeProps';
import {persist, store} from '@/redux/store';
import {ModalLoader} from '@/components/ModalLoader';
// @ts-ignore
import {API_URL} from '@env';
import {ModalError} from '@/components/ModalError';
import {SafeAreaView} from 'react-native';
import {AuthProvider} from '@/components/AuthRequired/AuthProvider';
import {MD3LightTheme as DefaultPaperTheme, MD3Theme} from 'react-native-paper';
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
  const NavigationTheme: NavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Constant.baseColor,
    },
  };

  const fontConfig = {
    fontFamily: 'Montserrat-Regular',
    customVariant: {
      fontFamily: Platform.select({
        web: '"Montserrat-Regular", "Roboto","Helvetica Neue", Helvetica, Arial, sans-serif',
        ios: 'System',
        default: 'Montserrat-Regular',
      }),
      fontWeight: '400',
      letterSpacing: 0.5,
      lineHeight: 22,
      fontSize: 14,
    },
  };
  const paperTheme: MD3Theme = {
    ...DefaultPaperTheme,
    fonts: configureFonts({config: fontConfig}),
  };
  //End Config theme

  useEffect(() => {
    async function updateNativeNavigationColor() {
      // set bottom tab color
      await SystemNavigationBar.setNavigationColor('#16133f', 'light');
    }
    updateNativeNavigationColor().then(r => {
      console.log(r, API_URL);
    });
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <AuthProvider>
          <CustomThemePreferencesProvider value={themePreference}>
            <SafeAreaProvider>
              <PaperProvider theme={paperTheme}>
                <SafeAreaView className="w-full h-full">
                  <StatusBar
                    barStyle={
                      theme === 'dark' ? 'light-content' : 'light-content'
                    }
                    backgroundColor={Constant.baseColor}
                  />
                  <NavigationContainer theme={NavigationTheme}>
                    <RootNavigation />
                  </NavigationContainer>
                  <ModalLoader />
                  <ModalError />
                </SafeAreaView>
              </PaperProvider>
            </SafeAreaProvider>
          </CustomThemePreferencesProvider>
        </AuthProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
