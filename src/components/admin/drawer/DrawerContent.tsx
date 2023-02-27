import CustomText from '@/components/common/CustomText';
import {useEventEmitter} from '@/hooks/eventContent';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {logout} from '@/redux/slice/authSlice';
import {getFileUrl} from '@/utils/storage';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Avatar, Divider} from '@rneui/themed';
import {capitalize} from 'lodash';
import {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import DrawerItem from './DrawerItem';

const HomeDrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch();
  const emitter = useEventEmitter();

  const auth = useAppSelector(state => state.auth);

  const goLogout = () => {
    props.navigation.closeDrawer();
    dispatch(logout());
  };

  useEffect(() => {
    if (!auth.token || !auth.user) {
      emitter.emit('disconnect');
      props.navigation.getParent()?.navigate('SignIn');
    }
  }, [auth, emitter]);

  return (
    <ScrollView className="pt-6">
      <View className="w-full justify-center px-4 flex-column pt-3 pb-6">
        <View className="py-1 self-center">
          <Avatar
            size="large"
            rounded
            source={{uri: `${getFileUrl(auth.user?.image ?? '')}`}}
          />
        </View>
        <View className="w-full justify-center items-center mt-1">
          <CustomText className="text-sm text-[#7e7e7e] font-bold">
            {capitalize(auth.user?.username)}
          </CustomText>
        </View>
      </View>
      <Divider className="mb-2" />
      <DrawerItem title={'Logout'} onClick={goLogout} />
    </ScrollView>
  );
};

export default HomeDrawerContent;
