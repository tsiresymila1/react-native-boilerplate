import {MessageDataType, MesssageFile} from '@/@types/chat';
import {Chat, Message, User} from '@/@types/data';
import {useEventEmitter} from '@/hooks/eventContent';
import {useAppSelector} from '@/hooks/redux';
import {useSocketIo} from '@/hooks/socketIoContent';
import {
  useGetDetailConversationQuery,
  useGetMessageConversationQuery,
} from '@/redux/api/chat/get';
import {useSendMessageMutation} from '@/redux/api/chat/post';
import {createMessage} from '@/utils/createMessage';
import {getFileUrl} from '@/utils/storage';
import { reverse } from 'lodash';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Platform, ToastAndroid} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import RNFetchBlob from 'rn-fetch-blob';

const useConv = (chat: Chat) => {
  const [scollEnd, setScrollEnd] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [images, setImages] = useState<{uri: string}[]>([]);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const [paginate, setPaginate] = useState({start: 0, page: 1, limit: 20});

  const [ref, setRef] = useState<FlatList<any> | null>(null);

  const {data, refetch} = useGetDetailConversationQuery({
    key: chat.id.toString(),
  });

  const {data: messageData, isLoading: isLoadingMessage,refetch: refecthMessage} =
    useGetMessageConversationQuery({
      key: chat.id.toString(),
      query: paginate,
    });

  const [sendMessage, {isSuccess, isLoading, isError}] =
    useSendMessageMutation();
  const [message, setMessage] = useState<MessageDataType>({files: []});
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Chat>(chat);
  const auth = useAppSelector(state => state.auth);
  const emitter = useEventEmitter();

  const loadImage = useCallback(() => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 10,
      presentationStyle: 'currentContext',
    }).then(data => {
      if (data.assets) {
        const images: MesssageFile[] = [];
        for (const as of data.assets) {
          images.push({
            name: as.fileName,
            type: as.type,
            uri:
              Platform.OS === 'android'
                ? as.uri
                : as.uri?.replace('file://', ''),
          });
        }
        setMessage(prev => ({
          ...prev,
          files: images,
          conversationId: conversation?.id,
        }));
      } else {
        setMessage(prev => ({
          ...prev,
          files: [],
          conversationId: conversation?.id,
        }));
      }
    });
  }, [conversation]);

  const sendMessageCallback = useCallback(
    (msg: MessageDataType, msgs: Message[]) => {
      setMessage({files: []});
      if ((msg.content && msg.content.trim() !== '') || msg.files.length > 0) {
        setMessages([
          ...msgs,
          ...createMessage(msg, auth.user as User, conversation),
        ]);
        if (msg.content && msg.files.length === 0) {
          emitter.emit('reconnect');
          emitter.emit('message', {
            data: {
              id: auth.user?.id,
              conversationId: conversation.id,
              content: msg.content,
            },
            callback: (response: any) => {
              console.log(
                'Message reponse >>>',
                response['messsages'][0] as Message,
              );
              refecthMessage();
            },
          });
        } else {
          sendMessage(msg).then((data: any) => {
            const d = data.data.data as Message[];
            setMessages([...msgs.filter(m => m.id !== 0), d[0]]);
          });
        }
      }
    },
    [conversation],
  );

  const isMe = useCallback(
    (message: any) => {
      return message.sender?.id === auth.user?.id;
    },
    [auth.user],
  );

  const downloadImage = useCallback(
    (url: string) => {
      RNFetchBlob.config({
        path: RNFetchBlob.fs.dirs.PictureDir,
      })
        .fetch('GET', url)
        .then(res => {
          ToastAndroid.showWithGravity(
            `The file saved to ${res.path()}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        });
    },
    [auth.user],
  );

  const showImage = (content: string) => {
    const index = images.findIndex(m => m.uri.endsWith(content));
    setImageIndex(index);
    setPreviewVisible(true);
  };

  const scrollToend = () => {
    try {
      ref?.scrollToEnd({animated: false});
    } catch (e: any) {}
  };

  const participants = useMemo(
    () =>
      (conversation?.participants ?? []).filter(
        (p: any) => auth.user?.id !== undefined && p.id !== auth.user?.id,
      ),
    [conversation],
  );

  useEffect(() => {
    if (data) {
      setConversation(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (messageData && messageData.data) {
      console.log("Message data >>>>>>>>>>>>>>",messageData.data)
      const mysqgs = ([...(messageData.data.data ?? [])]).reverse()
      setImages(
        (mysqgs)
          .filter((m: Message) => m.type === 2)
          .map((m: Message) => ({uri: getFileUrl(m.content ?? '')})),
      );
      setMessages(mysqgs)
    }
  }, [messageData]);

  useEffect(() => {
    setConversation(chat);
  }, [chat]);

  useEffect(() => {
    console.log('rerender >>>');
    // scrollToend();
  }, [messages]);

  useEffect(() => {
    emitter.on('conv-new-message', data => {
      console.log('Screen new-message', data);
      if (
        parseInt(data.convId.toString()) ===
        parseInt(conversation.id.toString())
      ) {
        refecthMessage();
      }
    });
    return () => {
      emitter.off('conv-new-message');
    };
  }, [emitter]);

  useEffect(() => {
    console.log('isSuccess, isError', isSuccess, isError);
    if (isSuccess || isError) {
      const t = setTimeout(() => setScrollEnd(1), 1000);
      return () => clearTimeout(t);
    } else if (!isLoading) {
      const t = setTimeout(() => setScrollEnd(1), 2000);
      return () => clearTimeout(t);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    refecthMessage();
  }, []);

  return {
    participants,
    messages,
    message,
    scollEnd,
    previewVisible,
    imageIndex,
    images,
    conversation,
    isLoadingMessage,
    setMessage,
    refetch: refecthMessage,
    refetchConv: refetch,
    setPreviewVisible,
    sendMessageCallback,
    isMe,
    showImage,
    loadImage,
    setRef,
    scrollToend,
    downloadImage,
    setPaginate
  };
};

export default useConv;
