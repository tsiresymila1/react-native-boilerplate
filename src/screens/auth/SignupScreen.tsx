import React, {useState} from 'react';
import {Keyboard, StyleSheet, ToastAndroid, View} from 'react-native';
import {i18n} from '@/i18n';
import {SingUpNavigationProps} from '@/config/navigation';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Constant from '../../helpers/constant';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../../components/common/CustomInput';
import Logo from '../../components/common/Logo';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import CustomText from '@/components/common/CustomText';
import CustomButton from '@/components/common/CustomButton';
import {useRegisterMutation} from '@/redux/api/auth/post';
import MyCustomButton from '@/components/common/Button';
import FastImage from 'react-native-fast-image';

const SignupScreen: React.FC<SingUpNavigationProps> = ({navigation}) => {
  const [singUp, {isLoading}] = useRegisterMutation();
  const [profil, setProfil] = useState<Asset | undefined>();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cpassword, setCPassword] = useState<string>('');

  const register = () => {
    if (isLoading) return;
    Keyboard.dismiss();
    if (cpassword === password && profil) {
      singUp({
        username,
        email,
        password,
        image: {
          uri: profil?.uri,
          name: profil?.fileName,
          type: profil?.type,
        },
      }).then(data => {
        // navigation.replace('Drawer', {
        //   screen: 'Home',
        //   params: {
        //     screen: 'Conversation',
        //     params: {
        //       screen: 'Chat',
        //     },
        //   },
        // });
        ToastAndroid.showWithGravity(
          'User register',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        navigation.replace('SignIn');
      });
    } else {
      ToastAndroid.showWithGravity(
        'Information not complet',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  const loadImage = async () => {
    if (profil) {
      setProfil(undefined);
      return;
    }
    await launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      (response: ImagePickerResponse) => {
        console.log('Response : >>>', response);
        if (response.assets) {
          setProfil(response.assets[0]);
        }
      },
    );
  };
  return (
    <View className="h-full w-full justify-center px-4 items-center">
      <View className="items-center flex-col py-1 w-[180px] h-[180px] bg-transparent border-[1px] border-[#acacac]  my-4 rounded-md">
        {profil && profil.uri && (
          <FastImage
            source={{uri: profil.uri}}
            className="h-[170px] w-[170px]"
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <View className="absolute justify-center pt-3">
          {(!profil || !profil.uri) && (
            <Logo className="h-[140px]" />
          )}
        </View>
        <View className="absolute bottom-1">
          <MyCustomButton onPress={loadImage}>
            <>
              {profil && (
                <FontAwesome
                  name="times"
                  color={Constant.baseColor}
                  size={24}
                />
              )}
              {!profil && (
                <FontAwesome
                  name="camera"
                  color={Constant.placeholderBaseColor}
                  size={24}
                />
              )}
            </>
          </MyCustomButton>
        </View>
      </View>
      <View className="w-full">
        <View className="pb-3">
          <CustomInput
            leftIcon={
              <FontAwesome
                name="user"
                color={Constant.placeholderBaseColor}
                size={20}
              />
            }
            placeholder="Name"
            onChangeText={e => setUsername(e)}
          />
        </View>
        <View className="pb-3">
          <CustomInput
            leftIcon={
              <FontAwesome
                name="envelope"
                color={Constant.placeholderBaseColor}
                size={20}
              />
            }
            placeholder="E-mail"
            onChangeText={e => setEmail(e)}
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
        <View className="pb-3">
          <CustomInput
            leftIcon={
              <FontAwesome
                name="lock"
                color={Constant.placeholderBaseColor}
                size={20}
              />
            }
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={e => setCPassword(e)}
          />
        </View>
      </View>
      <CustomButton
        className="w-full bg-[#009688] rounded-[8px]"
        contentStyle={styles.btnContentStyle}
        loading={isLoading}
        onPress={register}
        mode="contained">
        {i18n.t('register')}
      </CustomButton>
      <View className="flex flex-row justify-between py-4 px-2  w-full">
        <CustomText className="text-[#afafaf] py-2">
          Have already an account ?
        </CustomText>
        <CustomButton
          onPress={() => (isLoading ? {} : navigation.replace('SignIn'))}
          className="px-0 py-0"
          textColor={Constant.textBaseColor}
          mode="text">
          {i18n.t('login')}
        </CustomButton>
      </View>
    </View>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  btnContentStyle: {
    width: '100%',
    height: verticalScale(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
});
