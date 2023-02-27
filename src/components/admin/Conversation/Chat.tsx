import {ChatNavigationProps} from '@/config/navigation';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ConversationItem from './ConversationItem/ConversationItem';
import {useGetListConversationQuery} from '@/redux/api/chat/get';
import {useAppSelector} from '@/hooks/redux';
import {Chat} from '@/@types/data';
import {useEventEmitter} from '@/hooks/eventContent';

const ChatScreen: React.FC<ChatNavigationProps> = ({navigation}) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const auth = useAppSelector(state => state.auth);
  const {data, refetch, isFetching,isLoading} = useGetListConversationQuery(null);

  const emitter = useEventEmitter();

  const goToMessage = (chat: Chat) => {
    navigation.getParent()?.navigate('Message', {chat});
  };

  const refsehConnection = () => {
    refetch();
    console.log("refetchign ....")
    emitter.emit('reconnect');
  };

  useEffect(() => {
    if (data) {
      setChats(data.data.filter((c: Chat) => c.participants.length >= 2));
    }
  }, [data]);

  useEffect(() => {
    if (auth.token && auth.user) {
      refetch();
    }
  }, [auth]);

  useEffect(() => {
    // listen for event conversation-new-message 
    emitter.on('chat-new-message', data => {
      console.log('New message conversation >>>', data);
      if (!chats.map(c => c.id).includes(parseInt(data.convId.toString()))) {
        if ((data.receiver as number[]).includes(auth.user?.id ?? -1)) {
          refetch();
        }
      }
    });
    // remove listener 
    return () => {
      emitter.off('chat-new-message');
    };
  }, [emitter]);
  return (
    <>
      <FlatList
        refreshing={isFetching}
        onRefresh={refsehConnection}
        data={chats}
        renderItem={({item}) => {
          return (
            <ConversationItem
              onClick={() => goToMessage(item)}
              chat={item}
              key={`converstion-${item.id}`}
            />
          );
        }}
        className="px-0 pt-0 pb-[60px] mb-0"
      />
    </>
  );
};

export default ChatScreen;
