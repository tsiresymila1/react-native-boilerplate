import {NavigatorScreenParams} from '@react-navigation/native';
import { Chat } from '../data';
export type AdminNavigationProps = {
  Conversation: NavigatorScreenParams<ConvTabNavigationProps>;
  Message: {chat: Chat};
  SearchModal: undefined;
};

export type RootNavigationProps = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Drawer: NavigatorScreenParams<HomeDrawerNavigationProps>;
};

export type ConvTabNavigationProps = {
  Chat: undefined;
  Call: undefined;
  People: undefined;
  Story: undefined;
};

export type HomeDrawerNavigationProps = {
  Home: NavigatorScreenParams<AdminNavigationProps>;
};

