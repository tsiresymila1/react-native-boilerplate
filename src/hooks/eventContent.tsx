import * as React from 'react';
import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();
Object.freeze(emitter);

const EventContent = React.createContext<EventEmitter>(emitter);
export const useEventEmitter = () => {
  return React.useContext<EventEmitter>(EventContent);
};

export const EventContentProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <EventContent.Provider value={emitter}>{children}</EventContent.Provider>
  );
};
