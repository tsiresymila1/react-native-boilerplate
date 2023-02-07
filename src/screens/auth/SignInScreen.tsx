import React, {useCallback, useState} from 'react';
import {StyleSheet,  View} from 'react-native';
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

import {useAppDispatch} from '@/hooks/redux';
import {logged} from '@/redux/slice/authSlice';

const SignInScreen: React.FC<SignInNavigationProps> = ({navigation}) => {
  const [loginMutation, {data, isLoading, isError}] = useLoginMutation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const runLogin = useCallback(() => {
    loginMutation({email: username, password}).then(res => {
      const result = res as any;
      console.log(result);
      if (result && result.data && result.data.data) {
        const user = result.data.data;
        const token = result.data.headers['authorization'];
        console.log("State ",{user, token})
        dispatch(logged({user, token}));
        navigation.replace('Home', {
          screen: 'Conversation',
          params: {
            screen: 'Chat',
          },
        });
      }
    });
  }, [username,password]);

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
        className="w-full bg-[#2b207f] rounded-[8px]"
        contentStyle={styles.btnContentStyle}
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
          onPress={() => navigation.replace('SignUp')}
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
    height: verticalScale(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
});
