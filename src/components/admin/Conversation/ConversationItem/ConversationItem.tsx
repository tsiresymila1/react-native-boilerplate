import {Avatar} from '@rneui/themed';
import React from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import uuid from 'react-native-uuid';
import Animated, {Layout} from 'react-native-reanimated';
import CustomText from '@/components/common/CustomText';
import {truncate, capitalize} from 'lodash';
import {getFileUrl} from '@/utils/storage';
import {Chat, UserStateEnum} from '@/@types/data';
import moment from 'moment';
import useConvItem from '@/components/admin/Conversation/ConversationItem/hooks/useConvItem';

const ConversationItem = ({
  chat,
  onClick,
}: {
  chat: Chat;
  onClick: (key: string) => void;
}) => {
  const {currentChat, message, participants, auth, isRead} = useConvItem(chat);

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        'rgba(0, 150, 136, 0.04)',
        false,
      )}
      accessibilityRole="button"
      onPress={() => onClick(currentChat.id.toFixed())}
      onLongPress={() => {}}
      accessibilityState={{selected: true}}
      testID={`user-connected-item-${uuid.v4()}`}
      key={`user-connected-item-${uuid.v4()}`}>
      <Animated.View
        // entering={FadeIn.duration(0)}
        layout={Layout.springify()}
        className="w-full py-2 flex-row justify-start">
        <View className="px-3 mt-2">
          <Avatar
            size={46}
            rounded
            source={
              participants.length > 1
                ? require('./../../../../assets/images/group.png')
                : {
                    uri: `${getFileUrl(
                      participants.length > 0 ? participants[0].image : '',
                    )}`,
                  }
            }>
            {participants.length === 1 &&
              participants[0].state?.status === UserStateEnum.Online && (
                <View className="w-[10px] h-[10px] bg-[#009686] absolute bottom-1 right-1 rounded-lg"></View>
              )}
          </Avatar>
        </View>
        <View className="justify-between flex-row">
          <View className="w-8/12 justify-center">
            <View className="pb-1">
              <CustomText className="text-sm text-[#2b2b2b8e] font-bold">
                {capitalize(
                  participants.length > 0
                    ? participants.length > 1
                      ? `Message groupé (${participants
                          .map((p: any) => p.username)
                          .join('-')})`
                      : participants[0].username
                    : 'No user',
                )}
              </CustomText>
            </View>
            <View className="pt-1 flex-row">
              {isRead ? (
                <CustomText className="text-sm text-[#2b2b2b]">
                  {message?.type === 2
                    ? `${
                        capitalize(
                          (message?.sender?.id === auth.user?.id
                            ? 'You'
                            : message?.sender?.username) ?? '',
                        ) as string
                      } sent photo`
                    : truncate((message?.content ?? '') as string, {
                        length: 22,
                      })}
                </CustomText>
              ) : (
                <CustomText className="text-sm text-[#2b2b2b] font-bold">
                  {message?.type === 2
                    ? `${
                        capitalize(
                          (message?.sender?.id === auth.user?.id
                            ? 'You'
                            : message?.sender?.username) ?? '',
                        ) as string
                      } sent photo`
                    : truncate((message?.content ?? '') as string, {
                        length: 22,
                      })}
                </CustomText>
              )}
              <CustomText className="text-sm text-[#2b2b2b] mx-4">
                {moment(message?.updatedAt).format('HH:MM')}
              </CustomText>
            </View>
          </View>
          <View className="px-2 py-4 items-end flex">
            <EvilIcons name="check" color={'#bebebe'} size={20} />
          </View>
        </View>
      </Animated.View>
    </TouchableNativeFeedback>
  );
};

export default ConversationItem;
