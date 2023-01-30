import React, {useEffect} from 'react';
import {i18n} from '@/i18n';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {SplashNavigationProps} from '@/config/navigation';
import Logo from '@/components/common/Logo';
import CustomText from '@/components/common/CustomText';

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
      <View className={`justify-center w-full  items-center py-4`}>
        <Logo />
      </View>
      <View className={`justify-center w-full  items-center py-2`}>
        <CustomText
          className={`text-white text-[32px]`}>
          {i18n.t('title')}
        </CustomText>
      </View>
    </View>
  );
};

export default SplashScreen;
