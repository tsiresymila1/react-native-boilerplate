import React, {useEffect, ReactNode as AppNode} from 'react';
import {Provider as PaperProvider, configureFonts} from 'react-native-paper';
import {Platform, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme,
  Theme as NavTheme,
} from '@react-navigation/native';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from '@/routes/RouteNavigation';
import {CustomThemePreferencesProvider} from '@/config/theme';
import {CustomThemeProps} from '@/@types/CustomThemeProps';
import {persist, store} from '@/redux/store';
import {ModalLoader} from '@/components/ModalLoader';
import {ModalError} from '@/components/ModalError';
import {AuthProvider} from '@/components/AuthRequired/AuthProvider';
import {MD3LightTheme as DefaultPaperTheme, MD3Theme} from 'react-native-paper';
import {ModalLoaderProgress} from './components/ModalLoaderProgress';
import Toast from 'react-native-toast-message';
import {SocketIoContentProvider} from './hooks/socketIoContent';
import SocketIoComponent from './Socket/SocketIoComponent';
import {EventContentProvider} from './hooks/eventContent';

const App: React.FC<AppNode> = () => {
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
      // background: Constant.baseColor,
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
    colors: {
      primary: 'rgb(0, 106, 106)',
      onPrimary: 'rgb(255, 255, 255)',
      primaryContainer: 'rgb(111, 247, 246)',
      onPrimaryContainer: 'rgb(0, 32, 32)',
      secondary: 'rgb(74, 99, 99)',
      onSecondary: 'rgb(255, 255, 255)',
      secondaryContainer: 'rgb(204, 232, 231)',
      onSecondaryContainer: 'rgb(5, 31, 31)',
      tertiary: 'rgb(75, 96, 124)',
      onTertiary: 'rgb(255, 255, 255)',
      tertiaryContainer: 'rgb(211, 228, 255)',
      onTertiaryContainer: 'rgb(4, 28, 53)',
      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',
      background: 'rgb(250, 253, 252)',
      onBackground: 'rgb(25, 28, 28)',
      surface: 'rgb(250, 253, 252)',
      onSurface: 'rgb(25, 28, 28)',
      surfaceVariant: 'rgb(218, 229, 228)',
      onSurfaceVariant: 'rgb(63, 73, 72)',
      outline: 'rgb(111, 121, 121)',
      outlineVariant: 'rgb(190, 201, 200)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(45, 49, 49)',
      inverseOnSurface: 'rgb(239, 241, 240)',
      inversePrimary: 'rgb(76, 218, 218)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(238, 246, 245)',
        level2: 'rgb(230, 241, 240)',
        level3: 'rgb(223, 237, 236)',
        level4: 'rgb(220, 235, 235)',
        level5: 'rgb(215, 232, 232)',
      },
      surfaceDisabled: 'rgba(25, 28, 28, 0.12)',
      onSurfaceDisabled: 'rgba(25, 28, 28, 0.38)',
      backdrop: 'rgba(41, 50, 50, 0.4)',
    },
    fonts: configureFonts({config: fontConfig}),
  };
  //End Config theme

  useEffect(() => {
    async function updateNativeNavigationColor() {
      // set bottom tab color
      // await SystemNavigationBar.setNavigationColor(Constant.baseColor, 'light');
    }
    updateNativeNavigationColor().then(r => {
      // console.log(r, API_URL);
    });
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <AuthProvider>
          <CustomThemePreferencesProvider value={themePreference}>
            <SafeAreaProvider>
              <PaperProvider theme={paperTheme}>
                <EventContentProvider>
                  <SocketIoContentProvider>
                    <SocketIoComponent theme={theme}>
                      <NavigationContainer theme={NavigationTheme}>
                        <RootNavigation />
                      </NavigationContainer>
                      <ModalLoader />
                      <ModalError />
                      <ModalLoaderProgress />
                      <Toast
                        visibilityTime={2000}
                        position="bottom"
                        bottomOffset={20}
                      />
                    </SocketIoComponent>
                  </SocketIoContentProvider>
                </EventContentProvider>
              </PaperProvider>
            </SafeAreaProvider>
          </CustomThemePreferencesProvider>
        </AuthProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
