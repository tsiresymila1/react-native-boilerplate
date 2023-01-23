import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Circle} from 'react-native-animated-spinkit';
import Modal from 'react-native-modal';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {toggleLoader} from '../redux/slice/loaderSlice';

export const ModalLoader = () => {
  const isLoading = useAppSelector(state => state.loader.isLoading);
  const dispatch = useAppDispatch();

  const hideModal = () => {
    dispatch(toggleLoader(false));
  };

  return (
    <Modal
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      isVisible={isLoading}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      backdropOpacity={0.5}
      onBackButtonPress={hideModal}>
      <View style={styles.modalLoader}>
        <Circle size={48} color={'#ffffff'} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
