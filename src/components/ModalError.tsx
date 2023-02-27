// import Snackbar from 'react-native-snackbar';

import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';

import {hideError} from '@/redux/slice/errorSlice';
import Constant from '@/helpers/constant';
import CustomText from './common/CustomText';
import {Snackbar} from 'react-native-paper';

export const ModalError = () => {
  const error = useAppSelector(state => state.error);
  const dispatch = useAppDispatch();

  const hideModal = () => {
    dispatch(hideError());
  };

  return (
    <Snackbar
      duration={2000}
      visible={error.message !== undefined}
      className="bg-[#464f50]"
      wrapperStyle={{ borderStyle: "solid" }}
      onDismiss={() => {
        hideModal();
      }}>
      <CustomText className='text-[#f84f4f]'>{error.message}</CustomText>
    </Snackbar>
  );
};
