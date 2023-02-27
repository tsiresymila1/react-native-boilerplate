import {useEventEmitter} from '@/hooks/eventContent';
import {useAppSelector} from '@/hooks/redux';
import {useSocketIo} from '@/hooks/socketIoContent';
import {useCallback, useEffect} from 'react';
import {ToastAndroid} from 'react-native';

const useSocketComponent = () => {
  const socketIo = useSocketIo();
  const emitter = useEventEmitter();
  const auth = useAppSelector(state => state.auth);

  const disconnect = useCallback(() => {
    socketIo.emit('disconnected', auth.user?.id);
    socketIo.disconnect();
  }, [socketIo, auth]);

  const loopConnect = useCallback(() => {
    let id: number | undefined;
    if (auth.token && auth.user) {
      id = setInterval(() => {
        socketIo.emit('connected', auth?.user?.id);
      }, 10000);
    } else {
      id = undefined;
    }
    return id;
  }, [auth, socketIo]);

  useEffect(() => {
    // handle connection
    socketIo.on('connect', () => {
      ToastAndroid.showWithGravity(
        'Connected',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      emitter.emit('connected');
    });

    // socket io listenner
    socketIo.on('disconnect', reason => {
      socketIo.emit('disconnected', auth?.user?.id);
    });
    socketIo.on('message', data => {
      emitter.emit('conv-new-message', data);
      emitter.emit('c-new-message', data);
      emitter.emit('chat-new-message', data);
    });

    socketIo.on('user-connecteds', data => {
      console.log('List connected >>', data);
      emitter.emit('h-user-connecteds', data);
      emitter.emit('c-user-connecteds', data);
    });

    socketIo.on('user-connected', data => {
      console.log('new connected >>', data);
      emitter.emit('h-user-connected', data);
      emitter.emit('c-user-connected', data);
    });

    socketIo.on('user-disconnected', data => {
      console.log('new disconnected >>', data);
      emitter.emit('h-user-disconnected', data);
      emitter.emit('c-user-disconnected', data);
    });

    const id = loopConnect();

    // event emitter listener
    emitter.on('reconnect', () => {
      if (!socketIo.connected) {
        socketIo.connect();
      }
    });

    emitter.on('disconnect', () => {
      disconnect();
    });

    emitter.on('message', data => {
      socketIo.emit('message', data.data, (response: any) => {
        if (data.callback) {
          data.callback(response);
        }
      });
    });

    // update connectio nstatus
    // remove
    return () => {
      if (id !== undefined) {
        clearInterval(id);
      }
      socketIo.off('user-connecteds');
      socketIo.off('user-connected');
      socketIo.off('user-disconnected');
      socketIo.off('message');
      //disconnected
      disconnect();
      emitter.removeAllListeners();
    };
  }, [socketIo, auth]);
  return {};
};

export default useSocketComponent;
