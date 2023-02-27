import React, {useCallback} from 'react';
import {Avatar} from '@rneui/base';
import {capitalize} from 'lodash';
import uuid from 'react-native-uuid';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, TouchableNativeFeedback, View} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
import Animated, {FadeIn, Layout} from 'react-native-reanimated';
import {Appbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomInput from '@/components/common/CustomInput';
import CustomText from '@/components/common/CustomText';
import {getFileUrl} from '@/utils/storage';
import Constant from '@/helpers/constant';
import useConvHeader from './hooks/useHeader';

const ChatHeader: React.FC<{
  navigation: StackNavigationProp<ParamListBase, string, undefined>;
}> = ({navigation}) => {
  const {users, auth, goToSearch, openDrawer, loadChat} =
    useConvHeader(navigation);

  const FalstListItem = useCallback(() => {
    return (
      <FlatList
        data={users.filter(u => auth.user && u.id !== auth.user?.id)}
        horizontal
        keyExtractor={item => `user-${item.id}`}
        className="h-[76px]"
        renderItem={({item}) => (
          <View className="px-3 rounded-lg pt-2">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#009686', true, 10)}
              accessibilityRole="button"
              onPress={() => loadChat(item.id)}
              onLongPress={() => {}}
              accessibilityState={{selected: true}}
              accessibilityLabel={`${item.id}`}
              testID={`user-connected-item-${uuid.v4()}`}
              key={`user-connected-item-${uuid.v4()}`}>
              <Avatar
                size={46}
                rounded
                source={{
                  uri: `${getFileUrl(item.image ?? '')}`,
                }}>
                <View className="w-[10px] h-[10px] bg-[#009686] absolute bottom-1 right-1 rounded-lg"></View>
              </Avatar>
            </TouchableNativeFeedback>
            <View className="w-full justify-center items-center mt-1">
              <CustomText className="text-sm text-[#7e7e7e]">
                {capitalize(item.username)}
              </CustomText>
            </View>
          </View>
        )}
      />
    );
  }, [users]);

  return (
    <Appbar.Header elevated style={{height: 160}}>
      <Animated.View
        entering={FadeIn.duration(1000)}
        layout={Layout.springify()}
        className="w-full pb-2 pt-2">
        <View className="w-full justify-between px-4 flex-row py-3">
          <View className="py-1 mr-4">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                'rgba(0, 150, 136, 0.04)',
                true,
                10,
              )}
              accessibilityRole="button"
              onPress={openDrawer}
              onLongPress={() => {}}
              accessibilityState={{selected: true}}
              accessibilityLabel={`${uuid.v4()}`}
              testID={`user-connected-item-${uuid.v4()}`}
              key={`user-connected-item-${uuid.v4()}`}>
              <Ionicons size={26} color={Constant.baseColor} name="menu" />
            </TouchableNativeFeedback>
          </View>
          <View className="flex-1 px-2">
            <View style={{height: 20}}>
              <CustomInput
                onPressIn={goToSearch}
                placeholder="search"
                focusable={false}
                showSoftInputOnFocus={false}
                containerStyle={{height: 40}}
              />
            </View>
          </View>
        </View>
        <FalstListItem />
      </Animated.View>
    </Appbar.Header>
  );
};

export default ChatHeader;
