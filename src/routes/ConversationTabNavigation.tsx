import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AdminNavigationProps,
  ConvTabNavigationProps,
} from '@/@types/navigations/RootNavigationProps';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Constant from '@/helpers/constant';
import ChatScreen from '@/components/admin/Conversation/Chat';
import PeopleScreen from '@/components/admin/Conversation/People';

const Tab = createMaterialBottomTabNavigator<ConvTabNavigationProps>();

export const ConversationTabNavigation: React.FC<
  NativeStackScreenProps<AdminNavigationProps, 'Conversation', undefined>
> = ({navigation}) => {
  return (
    <>
      <Tab.Navigator
        barStyle={{
          borderTopColor: Constant.baseContainerColor,
          borderTopWidth: 1,
          elevation: 2,
          shadowColor: Constant.baseColor,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        }}
        initialRouteName={'Chat'}>
        <Tab.Screen
          options={{
            title: 'Chats',
            tabBarLabel: 'Chats',
            tabBarIcon: ({color}) => {
              return (
                <MaterialCommunityIcons name="chat" size={26} color={color} />
              );
            },
          }}
          name="Chat"
          component={ChatScreen}
        />
        <Tab.Screen
          options={{
            title: 'People',
            tabBarLabel: 'People',
            tabBarIcon: ({color}) => {
              return <MaterialIcons name="group-add" size={26} color={color} />;
            },
          }}
          name="People"
          component={PeopleScreen}
        />
      </Tab.Navigator>
    </>
  );
};

export default ConversationTabNavigation;
