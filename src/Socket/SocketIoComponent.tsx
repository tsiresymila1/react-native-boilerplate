import {ViewProps, SafeAreaView, StatusBar} from 'react-native';
import useSocketComponent from './useSocketComponent';

export const SocketIoComponent = ({
  children,
  theme,
  ...prop
}: ViewProps & {theme: 'dark' | 'light'}) => {
  useSocketComponent();
  return (
    <SafeAreaView {...prop} className="w-full h-full">
      <StatusBar
        barStyle={theme === 'dark' ? 'dark-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
        // backgroundColor={theme === 'dark' ? 'white' : 'black'}
      />
      {children}
    </SafeAreaView>
  );
};

export default SocketIoComponent;
