import {MessageDataType} from '@/@types/chat';
import {Chat, Message, User} from '@/@types/data';
import uuid from 'react-native-uuid'
const createMessage = (
  message: MessageDataType,
  sender: User,
  chat: Chat,
): Message[] => {
  const messages: Message[] = [];
  if (message.content && message.content.trim() !== '') {
    const date = new Date();
    messages.push({
      content: message.content,
      id: 0,
      createdAt: date,
      updatedAt: date,
      sender: sender,
      chat: chat,
      uuid: uuid.v4().toString(),
      type: 0,
      readers: [],
    });
  }
  if (message.files.length > 0) {
    for (const f of message.files) {
      const date = new Date();
      messages.push({
        content: f.uri,
        id: 0,
        uuid: uuid.v4().toString(),
        createdAt: date,
        updatedAt: date,
        sender: sender,
        chat: chat,
        type: 2,
        readers: [],
      });
    }
  }
  return messages;
};

export {createMessage};
