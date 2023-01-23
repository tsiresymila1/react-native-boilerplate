import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {i18n} from '../../i18n';
import {SignInNavigationProps} from '../../config/navigation';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import uuid from 'react-native-uuid';
import Constant from '../../helpers/constant';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {logout} from '../../redux/slice/authSlice';
import {toggleLoader} from '../../redux/slice/loaderSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    <View style={styles.center}>
      <View
        style={[
          styles.centerV,
          {height: verticalScale(120), alignItems: 'center'},
        ]}>
        <Image source={require('../../assets/images/ezway.png')} />
      </View>
      <View style={[styles.centerV, {height: verticalScale(50)}]}>
        <TextInput
          style={styles.input}
          dense
          mode={'outlined'}
          activeOutlineColor={'transparent'}
          outlineColor={'transparent'}
          placeholder={i18n.t('username')}
          placeholderTextColor={Constant.placeholderBaseColor}
          value={username}
          left={
            <TextInput.Icon
              color={Constant.textBaseColor}
              style={{marginTop: 12}}
              size={18}
              icon="account"
            />
          }
          theme={{
            colors: {text: Constant.textBaseColor},
            roundness: moderateScale(8),
          }}
          onChangeText={t => setUsername(t)}
        />
      </View>
      <View
        style={[styles.centerV, {height: verticalScale(50), marginBottom: 8}]}>
        <TextInput
          style={styles.input}
          dense
          mode="outlined"
          activeOutlineColor={'transparent'}
          outlineColor={'transparent'}
          placeholder={i18n.t('password')}
          secureTextEntry
          placeholderTextColor={Constant.placeholderBaseColor}
          value={password}
          left={
            <TextInput.Icon
              color={Constant.textBaseColor}
              style={{marginTop: 12}}
              size={18}
              icon="lock"
            />
          }
          theme={{
            colors: {text: Constant.textBaseColor},
            roundness: moderateScale(8),
          }}
          onChangeText={t => setPassword(t)}
        />
      </View>
      <Button
        style={styles.btnStyle}
        contentStyle={styles.btnContentStyle}
        labelStyle={{
          fontFamily: 'Monserrat-Medium',
        }}
        mode="contained"
        onPress={updateToken}>
        {i18n.t('login')}
      </Button>
      <Button
        mode="contained"
        style={styles.btnStyle}
        contentStyle={styles.btnContentStyle}
        onPress={removeCurrentToken}>
        {i18n.t('signup')}
      </Button>
    </View>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constant.baseColor,
    paddingHorizontal: scale(16),
  },
  centerV: {
    justifyContent: 'center',
    paddingVertical: verticalScale(4),
    height: verticalScale(40),
    width: '100%',
  },
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
  input: {
    height: 48,
    justifyContent: 'center',
    backgroundColor: Constant.secondColor,
    borderWidth: 0,
    fontSize: 14,
    color: "white"
  },
});
