import {useCallback, useState, useEffect} from 'react';
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppSelector} from '@/hooks/redux';
import {useGetListConnectedQuery} from '@/redux/api/user/get';
import {useLoadConversationMutation} from '@/redux/api/chat/post';
import {useEventEmitter} from '@/hooks/eventContent';
import {Chat, User} from '@/@types/data';

const useConvHeader = (
  navigation: StackNavigationProp<ParamListBase, string, undefined>,
) => {
  const auth = useAppSelector(state => state.auth);
  const [users, setUsers] = useState<User[]>([]);
  const {data, refetch} = useGetListConnectedQuery(null);
  const [loadConversation] = useLoadConversationMutation();
  const emitter = useEventEmitter();

  const goToMessage = (chat: Chat) => {
    navigation.navigate('Message', {chat});
  };

  const goToSearch = () => {
    navigation.navigate('SearchModal');
  };

  const openDrawer = () => {
    (navigation.getParent() as any).openDrawer();
  };

  const loadChat = useCallback(
    (id: number | string) => {
      const myid = auth.user?.id.toString() ?? '';
      const ids = [id, myid];
      loadConversation({keys: ids}).then((response: any) => {
        if (response && response.data) {
          const conversation = response.data.data;
          goToMessage(conversation);
        }
      });
    },
    [auth],
  );

  useEffect(() => {
    if (data) {
      setUsers(data.data);
    }
  }, [data]);

  useEffect(() => {
    // event emitter listenr
    emitter.emit('reconnect');
    // listen for single user connected
    emitter.on('h-user-connected', data => {
      const user = data as User;
      const f = users.find(u => u.id === user.id);

      if (f === undefined && user && user.id !== auth.user?.id) {
        console.log('New user >>>', user);
        setUsers([...users, user]);
      }
    });
    // listen for single user disconnected
    emitter.on('h-user-disconnected', data => {
      console.log('User disconnected >>>>', data);
      setUsers(users.filter(u => u.id !== data.id));
    });
    // listen for all users connected dispatch by server
    emitter.on('h-user-connecteds', data => {
      console.log('Conncted user', data);
      const users = data as User[];
      setUsers(users);
    });
    // remove event listener
    return () => {
      emitter.off('h-user-connecteds');
      emitter.off('h-user-connected');
      emitter.off('h-user-disconnected');
    };
  }, [emitter]);

  useEffect(() => {
    refetch();
  }, []);

  return {
    users,
    auth,
    goToSearch,
    openDrawer,
    loadChat,
  };
};

export default useConvHeader;
