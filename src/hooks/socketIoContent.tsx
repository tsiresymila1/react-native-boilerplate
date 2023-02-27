import {API_URL} from '@/redux/api/url';
import React from 'react';
import { StatusBar } from 'react-native';
import {Socket, io} from 'socket.io-client';

const socketio = io(API_URL.BASE_URL, {transports: ['polling', 'websocket']});
const SocketIoContent = React.createContext<Socket>(socketio);
export const useSocketIo = () => {
  return React.useContext<Socket>(SocketIoContent);
};

export const SocketIoContentProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <SocketIoContent.Provider value={socketio}>
      <StatusBar translucent  />
      {children}
    </SocketIoContent.Provider>
  );
};
