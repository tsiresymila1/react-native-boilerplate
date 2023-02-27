import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackCardInterpolationProps} from '@react-navigation/stack';
import {
  AdminNavigationProps,
  ConvTabNavigationProps,
  HomeDrawerNavigationProps,
  RootNavigationProps,
} from '../@types/navigations/RootNavigationProps';

export const navigationOption: any = {
  cardStyleInterpolator: ({current, layouts}: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        backgroundColor: 'transparent',
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
      style: {backgroundColor: 'transparent'},
      bodyStyle: {
        backgroundColor: 'transparent',
      },
    };
  },
  headerShown: false,
};

// Root navigation Props
export type SplashNavigationProps = NativeStackScreenProps<
  RootNavigationProps,
  'Splash'
>;
export type SignInNavigationProps = NativeStackScreenProps<
  RootNavigationProps,
  'SignIn'
>;
export type SingUpNavigationProps = NativeStackScreenProps<
  RootNavigationProps,
  'SignUp'
>;

export type HomeNavigationProps = NativeStackScreenProps<
  RootNavigationProps,
  "Drawer"
>;



export type DrawerHomeNavigationProps = NativeStackScreenProps<
  HomeDrawerNavigationProps,
  'Home'
>;

export type ConversationNavigationProps = NativeStackScreenProps<
  AdminNavigationProps,
  'Conversation'
>;

export type MessageNavigationProps = NativeStackScreenProps<
  AdminNavigationProps,
  'Message'
>;

export type ChatNavigationProps = NativeStackScreenProps<
  ConvTabNavigationProps,
  'Chat'
>;
