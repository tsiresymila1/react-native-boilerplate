import React, {useEffect} from 'react';
import {i18n} from '@/i18n';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {SplashNavigationProps} from '@/config/navigation';
import Logo from '@/components/common/Logo';
import CustomText from '@/components/common/CustomText';
import {useAppSelector} from '@/hooks/redux';
import {useLazyGetMeQuery} from '@/redux/api/user/get';
import {ActivityIndicator} from 'react-native-paper';
import Constant from '@/helpers/constant';

const SplashScreen: React.FC<SplashNavigationProps> = ({navigation}) => {
  const [getMe, {data, error, isLoading}] = useLazyGetMeQuery();
  const auth = useAppSelector(state => state.auth);
  const loading = () => {
    new Promise<{data: string | null}>(resolve =>
      setTimeout(() => resolve({data: 'ok'}), 100),
    ).then(() => {
      if (data) {
        navigation.replace('Drawer', {
          screen: 'Home',
          params: {
            screen: 'Conversation',
            params: {
              screen: 'Chat',
            },
          },
        });
      } else {
        navigation.replace('SignIn');
      }
    });
  };
  useEffect(() => {
    if (auth.token && auth.user) {
      getMe(null);
    } else {
      navigation.replace('SignIn');
    }
  }, [auth]);

  useEffect(() => {
    if (data || error) {
      loading();
    }
  }, [data, error]);

  return (
    <View
      className={`flex-1 items-center justify-center bg-[#0096871c] px-[${scale(
        16,
      )}]`}>
      <View className={`justify-center w-full  items-center py-4`}>
        <Logo />
      </View>
      <View className={`justify-center w-full  items-center py-2`}>
        <CustomText className={`text-[#009686] text-[32px]`}>
          {i18n.t('title')}
        </CustomText>
      </View>
      {isLoading && (
        <View className={`justify-center w-full  items-center py-2`}>
          <ActivityIndicator color={Constant.baseColor} size={30} />
        </View>
      )}
    </View>
  );
};

export default SplashScreen;
