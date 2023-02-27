import {useEffect} from 'react';
import {useAppSelector} from '@/hooks/redux';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  AdminNavigationProps,
  HomeDrawerNavigationProps,
  RootNavigationProps,
} from '@/@types/navigations/RootNavigationProps';
import {useEventEmitter} from '@/hooks/eventContent';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationOption} from '@/config/navigation';
import ChatHeader from '@/components/admin/Conversation/Header/Header';
import ConversationTabNavigation from './ConversationTabNavigation';
import SearchModalScreen from '@/screens/admin/SearchModalScreen';
import ConversationScreen from '@/components/admin/Conversation/chat/ConversationScreen';

const AdminHomeNavigationStack = createStackNavigator<AdminNavigationProps>();

const AdminHomeNavigation: React.FC<
  NativeStackScreenProps<HomeDrawerNavigationProps, 'Home'>
> = ({navigation}) => {
  // state
  const auth = useAppSelector(state => state.auth);
  const emitter = useEventEmitter();

  // life cycle
  useEffect(() => {
    if (!auth.token || !auth.user) {
      navigation
        .getParent<
          NativeStackNavigationProp<RootNavigationProps, 'Drawer', undefined>
        >()
        .replace('SignIn');
    } else {
      console.log('Sending connection auth ');
      emitter.emit('reconnect');
    }
  }, [auth, emitter]);

  return (
    <AdminHomeNavigationStack.Navigator>
      <AdminHomeNavigationStack.Screen
        options={{
          ...navigationOption,
          headerShown: true,
          header(props) {
            return <ChatHeader navigation={props.navigation} />;
          },
        }}
        name="Conversation"
        component={ConversationTabNavigation}
      />
      <AdminHomeNavigationStack.Group screenOptions={{presentation: 'modal'}}>
        <AdminHomeNavigationStack.Screen
          options={{headerShown: false}}
          name="SearchModal"
          component={SearchModalScreen}
        />
      </AdminHomeNavigationStack.Group>
      <AdminHomeNavigationStack.Screen
        options={{...navigationOption, headerShown: false}}
        name="Message"
        component={ConversationScreen}
      />
    </AdminHomeNavigationStack.Navigator>
  );
};

export default AdminHomeNavigation;
