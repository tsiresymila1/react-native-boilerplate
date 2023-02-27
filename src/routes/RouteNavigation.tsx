import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {RootNavigationProps} from '../@types/navigations/RootNavigationProps';
import SignInScreen from '../screens/auth/SignInScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import {navigationOption} from '../config/navigation';

import {Appbar} from 'react-native-paper';
import AdminDrawerNavigation from './AdminDrawerNavigation';

const AppbarContent = Appbar.Content as any;
const RootStack = createStackNavigator<RootNavigationProps>();

const RootNavigation = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        ...navigationOption,
        headerShown: true,
        header(props) {
          return (
            <Appbar.Header elevated>
              <AppbarContent
                color="#010101"
                titleStyle={{
                  fontFamily: 'Montserrat-Bold',
                  display: 'flex',
                  alignSelf: 'center',
                }}
                title={props.options.title}
              />
            </Appbar.Header>
          );
        },
      }}
      initialRouteName={'Splash'}>
      <RootStack.Screen
        options={{
          headerShown: false,
        }}
        name={'Splash'}
        component={SplashScreen}
      />
      <RootStack.Screen
        options={{
          title: 'SIGNIN',
        }}
        name={'SignIn'}
        component={SignInScreen}
      />
      <RootStack.Screen
        options={{
          title: 'REGISTER',
        }}
        name={'SignUp'}
        component={SignupScreen}
      />
      {/*<RootStack.Screen name={'Home'} component={SignupScreen} />*/}
      <RootStack.Screen
        options={{
          headerShown: false,
        }}
        name="Drawer"
        component={AdminDrawerNavigation}
      />
    </RootStack.Navigator>
  );
};
export default RootNavigation;
