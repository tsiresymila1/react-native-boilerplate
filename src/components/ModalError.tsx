import {Button} from 'react-native-paper';
import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {i18n} from '../i18n';
import {hideError} from '../redux/slice/errorSlice';

export const ModalError = () => {
  const message = useAppSelector(state => state.error.message);
  const dispatch = useAppDispatch();

  const hideModal = () => {
    dispatch(hideError());
  };

  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'zoomOut'}
      isVisible={message != null}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      backdropOpacity={0.5}
      onBackButtonPress={hideModal}>
      <View className="flex-col bg-white rounded-md ">
        <View className="w-full justify-between flex-row bg-red-800  px-4 py-4 rounded-t-md">
          <Text className="text-red">Error</Text>
          <FontAwesome
            onPress={hideModal}
            name="times"
            color="white"
            size={24}
          />
        </View>
        <View className="w-full justify-center bg-white px-4 py-4">
          <Text className="text-red-900">{message ?? ''}</Text>
        </View>
        <View className="w-full flex-row justify-center bg-white px-4 py-4 rounded-b-md">
          <View className="mx-4 w-full">
            <Button
              className="w-full bg-red-800 rounded-[8px] py-1"
              // contentStyle={styles.btnContentStyle}
              labelStyle={{
                fontFamily: 'Monserrat-Regular',
              }}
              onPress={hideModal}
              mode="contained">
              {i18n.t('ok')}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
