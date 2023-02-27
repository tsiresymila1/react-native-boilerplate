import {Chat, Message, User, UserStateEnum} from '@/@types/data';
import {useEventEmitter} from '@/hooks/eventContent';
import {useAppSelector} from '@/hooks/redux';
import {useSocketIo} from '@/hooks/socketIoContent';
import {isEqual} from 'lodash';
import {useEffect, useMemo, useState} from 'react';

const useConvItem = (chat: Chat) => {
  const [currentChat, setCurrentChat] = useState<Chat>(chat);

  const emitter = useEventEmitter();
  const auth = useAppSelector(state => state.auth);

  const message = useMemo(() => {
    return currentChat.messages.length > 0
      ? currentChat.messages[currentChat.messages.length - 1]
      : undefined;
  }, [currentChat]);

  const participants = useMemo(
    () =>
      currentChat.participants.filter(
        (p: any) => auth.user?.id !== undefined && p.id !== auth.user?.id,
      ),
    [currentChat],
  );

  const isRead = useMemo(() => {
    if (message) {
      return (
        message.readers.find((m: any) => m.id === auth.user?.id) !== undefined
      );
    }
    return false;
  }, [message, auth, currentChat]);

  useEffect(() => {
    emitter.emit('reconnect');
    emitter.on('c-new-message', data => {
      if (
        parseInt(data.convId.toString()) === parseInt(currentChat.id.toString())
      ) {
        setCurrentChat({
          ...currentChat,
          messages: [...currentChat.messages, ...(data.messages as Message[])],
        });
      }
    });
    emitter.on('c-user-connecteds', data => {
      const users = data as User[];
      const newParticipants = currentChat.participants.reduce<User[]>(
        (p, n) => {
          const newUser = users.find(f => f.id === n.id);
         
          if (newUser) {
            p.push(newUser);
          } else {
            p.push({
              ...n,
              state: {
                ...n.state,
                status: UserStateEnum.Offline
              }
            });
          }
          return p;
        },
        [],
      );
      if (
        !isEqual(
          newParticipants.map(e => e.state?.status),
          currentChat.participants.map(e => e.state?.status),
        )
      ) {
        setCurrentChat({
          ...currentChat,
          participants: newParticipants,
        });
      }
    });
    emitter.on('c-user-connected', data => {
      const newUser = data as User;
      const newParticipants = currentChat.participants.reduce<User[]>(
        (p, n) => {
          if (newUser.id === n.id) {
            p.push(newUser);
          } else {
            p.push(n);
          }
          return p;
        },
        [],
      );
      setCurrentChat({
        ...currentChat,
        participants: newParticipants,
      });
    });
    emitter.on('c-user-disconnected', data => {
      const newUser = data as User;
      const newParticipants = currentChat.participants.reduce<User[]>(
        (p, n) => {
          if (newUser.id === n.id) {
            p.push({
              ...newUser,
              state: {
                ...newUser.state,
                status: UserStateEnum.Offline,
              },
            });
          } else {
            p.push(n);
          }
          return p;
        },
        [],
      );
      setCurrentChat({
        ...currentChat,
        participants: newParticipants,
      });
    });
    return () => {
      emitter.off('c-new-message');
      emitter.off('c-user-connecteds');
      emitter.off('c-user-connected');
      emitter.off('c-user-disconnected');
    };
  }, [emitter, currentChat]);

  return {
    currentChat,
    message,
    participants,
    auth,
    isRead,
  };
};

export default useConvItem;
