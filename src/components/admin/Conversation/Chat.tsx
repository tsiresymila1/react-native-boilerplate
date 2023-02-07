import {ChatNavigationProps} from '@/config/navigation';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import ConversationItem from './ConversationItem/ConversationItem';
import {useLazyGetListConversationQuery} from '@/redux/api/chat/get';
import {useAppSelector} from '@/hooks/redux';

const Chat: React.FC<ChatNavigationProps> = () => {
  const [chats, setChats] = useState<any[]>([]);

  const auth = useAppSelector(state => state.auth);
  const [getChat, {data}] = useLazyGetListConversationQuery();

  useEffect(() => {
    if (auth.token) {
      getChat(null);
    }
  }, [auth]);

  useEffect(() => {
    if (data) {
      setChats(data.data);
    }
  }, [data]);
  return (
    <ScrollView className="px-0 pt-0 pb-[60px] mb-0">
      {chats.map(chat => {
        return <ConversationItem chat={chat} key={`converstion-${chat.key}`} />;
      })}
    </ScrollView>
  );
};

export default Chat;
