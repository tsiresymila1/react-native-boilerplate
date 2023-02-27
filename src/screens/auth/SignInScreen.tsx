import React, {useCallback, useEffect, useState} from 'react';
import {Image, Keyboard, StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {i18n} from '@/i18n';
import {SignInNavigationProps} from '@/config/navigation';
import Constant from '../../helpers/constant';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import CustomInput from '../../components/common/CustomInput';
import Logo from '../../components/common/Logo';
import {useLoginMutation} from '@/redux/api/auth/post';
import CustomText from '@/components/common/CustomText';
import CustomButton from '@/components/common/CustomButton';

import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {logged} from '@/redux/slice/authSlice';
import {useEventEmitter} from '@/hooks/eventContent';

const SignInScreen: React.FC<SignInNavigationProps> = ({navigation}) => {
  const auth = useAppSelector(state => state.auth);
  const [loginMutation, {data, isLoading, isError}] = useLoginMutation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const emitter = useEventEmitter();

  const runLogin = useCallback(() => {
    if (isLoading) return;
    Keyboard.dismiss();
    if (username.length < 4 || password.length < 4) {
      return;
    }
    loginMutation({username, password}).then(res => {
      const result = res as any;
      console.log(result);
      if (result && result.data && result.data.data) {
        const user = result.data.data['user'];
        const token = `Bearer ${result.data.data['access_token']}`;
        console.log('State ', {user, token});
        dispatch(logged({user, token}));
      }
    });
  }, [username, password]);

  useEffect(() => {
    if (auth.token && auth.user) {
      emitter.emit('reconnect');
      navigation.replace('Drawer', {
        screen: 'Home',
        params: {
          screen: 'Conversation',
          params: {
            screen: 'Chat',
          },
        },
      });
    }
  }, [auth, emitter]);

  return (
    <View className="h-full w-full justify-center px-4">
      <View className="w-full justify-center items-center py-4">
        <Logo />
      </View>
      <View className="pb-3">
        <CustomInput
          leftIcon={
            <FontAwesome
              name="user"
              color={Constant.placeholderBaseColor}
              size={20}
            />
          }
          placeholder="E-mail"
          onChangeText={e => setUsername(e)}
        />
      </View>
      <View className="pb-3">
        <CustomInput
          leftIcon={
            <FontAwesome
              name="lock"
              color={Constant.placeholderBaseColor}
              size={20}
            />
          }
          placeholder="Password"
          secureTextEntry
          onChangeText={e => setPassword(e)}
        />
      </View>
      <CustomButton
        className="w-full rounded-[8px]"
        buttonColor="#009688"
        // disabled={username.length === 0 || password.length === 0}
        contentStyle={styles.btnContentStyle}
        loading={isLoading}
        mode="contained"
        onPress={runLogin}>
        {i18n.t('login')}
      </CustomButton>
      <View className="flex flex-row justify-between py-4 px-2">
        <CustomText className="text-[#afafaf] py-2">
          Don't have any account ?
        </CustomText>
        <CustomButton
          className="px-0 py-0"
          textColor={Constant.textBaseColor}
          onPress={() => (isLoading ? {} : navigation.replace('SignUp'))}
          mode="text">
          {i18n.t('register')}
        </CustomButton>
      </View>
    </View>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  btnContentStyle: {
    width: '100%',
    color: 'white',
    height: verticalScale(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
});
