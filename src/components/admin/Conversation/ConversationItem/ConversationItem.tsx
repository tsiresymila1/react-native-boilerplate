import {Avatar} from '@rneui/themed';
import React from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import uuid from 'react-native-uuid';
const ConversationItem = () => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('#acacac', false)}
      accessibilityRole="button"
      onPress={() => {}}
      onLongPress={() => {}}
      accessibilityState={{selected: true}}
      testID={`user-connected-item-${uuid.v4()}`}
      key={`user-connected-item-${uuid.v4()}`}>
      <View className="w-full py-2 flex-row justify-start">
        <View className="px-3">
          <Avatar
            size={56}
            rounded
            source={{
              uri: 'https://randomuser.me/api/portraits/men/36.jpg',
            }}>
            <View className="w-[10px] h-[10px] bg-green-500 absolute bottom-1 right-1 rounded-lg"></View>
          </Avatar>
        </View>
        <View className=" justify-between flex-row">
          <View className="w-8/12 justify-center">
            <View className="pb-1">
              <Text className="text-sm text-[#bebebe] " style={{fontFamily: "Monserrat-Regular"}}>
                Randriarimanana Tsiresy Milà
              </Text>
            </View>
            <View className="pt-1 flex-row">
              <Text className="text-sm text-[#bebebe]">
                exmeple conversation
              </Text>
              <Text className="text-sm text-[#bebebe] mx-4">07:23</Text>
            </View>
          </View>
          <View className="px-2 py-4 items-end flex">
            <EvilIcons name="check" color={'#bebebe'} size={20} />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ConversationItem;
