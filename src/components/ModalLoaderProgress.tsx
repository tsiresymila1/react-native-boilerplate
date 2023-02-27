import React, {useEffect, useState} from 'react';
import {useAppSelector} from '@/hooks/redux';
import {LinearProgress} from '@rneui/base';
import Constant from '@/helpers/constant';
import Modal from 'react-native-modal';
import { View } from 'react-native';

export const ModalLoaderProgress = () => {
  const {isLoading, loaded} = useAppSelector(state => state.loader);
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isLoading);
  }, [isLoading]);

  // return (
  //   <Modal
  //     animationIn={'fadeInDown'}
  //     animationOutTiming={20}
  //     isVisible={visible}
  //     useNativeDriver={true}
  //     useNativeDriverForBackdrop={true}
  //     className="m-0 flex justify-start"
  //     onBackButtonPress={() => {
  //       setIsVisible(false);
  //     }}
  //     backdropColor={'#304b48b9'}
  //     backdropOpacity={0.2}>
  //     <LinearProgress
  //       animation={{duration: 1000}}
  //       color={Constant.baseColor}
  //       trackColor={Constant.baseContainerColor}
  //       value={Math.max(loaded / 100, 0.8)}
  //     />
  //   </Modal>
  // );
  return <View />
};
