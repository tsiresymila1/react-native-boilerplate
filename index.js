/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { setCustomText } from 'react-native-global-props';


setCustomText({
  style: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'white',
  },
});



AppRegistry.registerComponent(appName, () => App);
