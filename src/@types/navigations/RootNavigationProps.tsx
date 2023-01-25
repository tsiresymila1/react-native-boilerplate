import {NavigatorScreenParams} from '@react-navigation/native';
export type AdminNavigationProps = {
  Conversation: NavigatorScreenParams<ConvTabNavigationProps>;
  Message: undefined;
  Settings: undefined;
};

export type RootNavigationProps = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: NavigatorScreenParams<AdminNavigationProps>;
};

export type ConvTabNavigationProps = {
  Chat: undefined;
  Call: undefined;
  People: undefined;
  Story: undefined;
};
