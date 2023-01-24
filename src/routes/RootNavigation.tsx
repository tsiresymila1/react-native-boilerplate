import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootNavigationProps} from '../@types/navigations/RootNavigationProps';
import SignInScreen from '../screens/auth/SignInScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import {navigationOption} from '../config/navigation';
import ConversationScreen from '../screens/admin/ConversationScreen';

const RootStack = createStackNavigator<RootNavigationProps>();

const RootNavigation = () => {
  return (
    <RootStack.Navigator
      screenOptions={navigationOption}
      initialRouteName={'Splash'}>
      <RootStack.Screen name={'Splash'} component={SplashScreen} />
      <RootStack.Screen name={'SignIn'} component={SignInScreen} />
      <RootStack.Screen name={'SignUp'} component={SignupScreen} />
      {/*<RootStack.Screen name={'Home'} component={SignupScreen} />*/}
      <RootStack.Group>
        <RootStack.Screen
          name="Home"
          component={ConversationScreen}></RootStack.Screen>
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
export default RootNavigation;
