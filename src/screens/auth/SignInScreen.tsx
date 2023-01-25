import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {i18n} from '../../i18n';
import {SignInNavigationProps} from '../../config/navigation';
import Constant from '../../helpers/constant';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import CustomInput from '../../components/common/CustomInput';
import Logo from '../../components/common/Logo';
import {useLoginMutation} from '../../redux/api/auth/post';

const SignInScreen: React.FC<SignInNavigationProps> = ({navigation}) => {
  const [loginMutation] = useLoginMutation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const runLogin = useCallback(() => {
    loginMutation({username, password}).then(res => {
      const result = res as any;
      if (result && result.data) {
        navigation.navigate('SignUp');
      }
    });
  }, []);

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
        className="w-full bg-[#2b207f] rounded-[8px]"
        contentStyle={styles.btnContentStyle}
        labelStyle={{
          fontFamily: 'Monserrat-Regular',
        }}
        mode="contained"
        onPress={runLogin}>
        {i18n.t('login')}
      </Button>
      <View className="flex flex-row justify-between py-4 px-2">
        <Text className="text-[#afafaf] py-2">Don't have any account ?</Text>
        <Button
          className="px-0 py-0"
          textColor={Constant.textBaseColor}
          onPress={() => navigation.replace('SignUp')}
          mode="text">
          {i18n.t('register')}
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
});
