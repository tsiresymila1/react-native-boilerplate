import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {i18n} from '../../i18n';
import {SingUpNavigationProps} from '../../config/navigation';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Button} from 'react-native-paper';
import Constant from '../../helpers/constant';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../../components/common/CustomInput';
import Logo from '../../components/common/Logo';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

const SignupScreen: React.FC<SingUpNavigationProps> = ({navigation}) => {
  const [profil, setProfil] = useState<Asset | undefined>();

  const register = () => {
    navigation.navigate('Home', {
      screen: 'Conversation',
      params: {
        screen: 'Chat',
      },
    });
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
      <View className="items-center flex-col py-4 w-[180px] h-[180px] bg-transparent border-[1px] border-[#acacac]  my-4 rounded-md">
        <View className="absolute bottom-1">
          <TouchableHighlight onPress={loadImage}>
            <>
              {profil && (
                <FontAwesome
                  name="times"
                  color={Constant.placeholderBaseColor}
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
          </TouchableHighlight>
        </View>
        {profil && profil.uri && (
          <Image
            source={{uri: profil.uri}}
            className="h-[140px] w-[140px]"
            resizeMode="contain"
          />
        )}
        {(!profil || !profil.uri) && <Logo />}
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
            // onChangeText={e => setUsername(e)}
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
            // onChangeText={e => setUsername(e)}
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
            // onChangeText={e => setPassword(e)}
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
            // onChangeText={e => setPassword(e)}
          />
        </View>
      </View>
      <Button
        className="w-full bg-[#2b207f] rounded-[8px]"
        contentStyle={styles.btnContentStyle}
        onPress={register}
        labelStyle={{
          fontFamily: 'Monserrat-Regular',
        }}
        mode="contained">
        {i18n.t('register')}
      </Button>
      <View className="flex flex-row justify-between py-4 px-2  w-full">
        <Text className="text-[#afafaf] py-2">Have already an account ?</Text>
        <Button
          onPress={() => navigation.replace('SignIn')}
          className="px-0 py-0"
          textColor={Constant.textBaseColor}
          mode="text">
          {i18n.t('login')}
        </Button>
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
