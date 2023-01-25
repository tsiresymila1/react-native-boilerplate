import {ChatNavigationProps} from '@/config/navigation';
import React from 'react';
import {ScrollView} from 'react-native';
import ConversationItem from './ConversationItem/ConversationItem';

const Chat: React.FC<ChatNavigationProps> = () => {
  return (
    <ScrollView className="px-0 pt-0 pb-[60px] mb-0">
      {[...Array(10).keys()].map(e => {
        return <ConversationItem key={`converstion-${e}`} />;
      })}
    </ScrollView>
  );
};

export default Chat;
