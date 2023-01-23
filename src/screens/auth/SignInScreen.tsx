import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {i18n} from '../../i18n';
import {SignInNavigationProps} from '../../config/navigation';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import uuid from 'react-native-uuid';
import Constant from '../../helpers/constant';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {logout} from '../../redux/slice/authSlice';
import {toggleLoader} from '../../redux/slice/loaderSlice';
import CustomInput from '../../components/common/CustomInput';
import Logo from '../../components/common/Logo';

const SignInScreen: React.FC<SignInNavigationProps> = ({navigation}) => {
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const updateToken = () => {
    const newToken: string = uuid.v4().toString();
    // dispatch(setToken(newToken));
    loading(true);
  };

  const removeCurrentToken = () => {
    dispatch(logout());
    loading(false);
  };

  const loading = (state: boolean) => {
    dispatch(toggleLoader(state));
  };

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
          placeholder="Username"
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
      <Button
        style={styles.btnStyle}
        contentStyle={styles.btnContentStyle}
        labelStyle={{
          fontFamily: 'Monserrat-Regular',
        }}
        mode="contained"
        onPress={updateToken}>
        {i18n.t('login')}
      </Button>
      <View className="flex flex-row justify-between py-4 px-2">
        <Text className="text-[#afafaf] py-2">Don't have any account ?</Text>
        <Button
          className="px-0 py-0"
          textColor={Constant.textBaseColor}
          mode="text">
          Register
        </Button>
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
  btnStyle: {
    width: '100%',
    height: verticalScale(36),
    borderRadius: moderateScale(8),
    marginVertical: verticalScale(4),
    backgroundColor: Constant.btnColor,
  },
});
