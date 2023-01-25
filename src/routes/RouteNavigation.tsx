import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {
  AdminNavigationProps,
  ConvTabNavigationProps,
  RootNavigationProps,
} from '../@types/navigations/RootNavigationProps';
import SignInScreen from '../screens/auth/SignInScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import {navigationOption} from '../config/navigation';
import ConversationScreen from '../screens/admin/ConversationScreen';
import Chat from '../components/admin/Conversation/Chat';
import People from '../components/admin/Conversation/People';
import CustomTabBar from '../components/TabBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RootStack = createStackNavigator<RootNavigationProps>();
const ConversationStack = createStackNavigator<AdminNavigationProps>();
const Tab = createBottomTabNavigator<ConvTabNavigationProps>();

export const ConversationTab = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={navigationOption}
      initialRouteName={'Chat'}>
      <Tab.Screen
        options={{
          title: 'Chats',
          tabBarLabel: 'Chats',
          tabBarIcon: ({size, color}) => {
            return (
              <MaterialCommunityIcons
                name="chat"
                size={size}
                color={color}
              />
            );
          },
        }}
        name="Chat"
        component={Chat}
      />
      <Tab.Screen
        options={{
          title: 'People',
          tabBarLabel: 'People',
          tabBarIcon: ({size, color}) => {
            return <MaterialIcons name="group-add" size={size} color={color} />;
          },
        }}
        name="People"
        component={People}
      />
    </Tab.Navigator>
  );
};

const AdminNavigation = () => {
  return (
    <ConversationStack.Navigator screenOptions={navigationOption}>
      <ConversationStack.Screen
        name="Conversation"
        component={ConversationScreen}></ConversationStack.Screen>
    </ConversationStack.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <RootStack.Navigator
      screenOptions={navigationOption}
      initialRouteName={'Splash'}>
      <RootStack.Screen name={'Splash'} component={SplashScreen} />
      <RootStack.Screen name={'SignIn'} component={SignInScreen} />
      <RootStack.Screen name={'SignUp'} component={SignupScreen} />
      {/*<RootStack.Screen name={'Home'} component={SignupScreen} />*/}
      <RootStack.Screen name="Home" component={AdminNavigation} />
    </RootStack.Navigator>
  );
};
export default RootNavigation;
