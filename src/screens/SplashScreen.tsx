import React, {useEffect} from 'react';
import {i18n} from '../i18n';
import {Image, Text, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SplashNavigationProps} from '../config/navigation';

const SplashScreen: React.FC<SplashNavigationProps> = ({navigation}) => {
  const loading = () => {
    new Promise<{data: string | null}>(resolve =>
      setTimeout(() => resolve({data: 'ok'}), 3000),
    ).then(() => {
      navigation.replace('SignIn');
    });
  };
  useEffect(() => {
    loading();
  });
  return (
    <View
      className={`flex-1 items-center justify-center  bg-[#211f4a] px-[${scale(
        16,
      )}]`}>
      <View
        className={`justify-center w-full  items-center h-[${verticalScale(
          80,
        )}]`}>
        <Image source={require('../assets/images/ezway.png')} />
      </View>
      <View
        className={`justify-center w-full  items-center h-[${verticalScale(
          80,
        )}]`}>
        <Text className={`text-white text-[32px]`}>{i18n.t('title')}</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
