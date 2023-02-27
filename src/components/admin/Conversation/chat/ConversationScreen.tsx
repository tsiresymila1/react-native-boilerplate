import IncoMessageItem from '@/components/admin/Conversation/Message/IncoMessageItem';
import MyMessageItem from '@/components/admin/Conversation/Message/MyMessageItem';
import MyCustomButton from '@/components/common/Button';
import CustomInput from '@/components/common/CustomInput';
import CustomText from '@/components/common/CustomText';
import {MessageNavigationProps} from '@/config/navigation';
import {getFileUrl} from '@/utils/storage';
import {Avatar} from '@rneui/themed';
import {FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageView from 'react-native-image-viewing';
import {capitalize} from 'lodash';
import uuid from 'react-native-uuid';
import Constant from '@/helpers/constant';
import {Appbar} from 'react-native-paper';
import moment from 'moment';
import useConv from './hooks/useConv';
import {UserStateEnum} from '@/@types/data';
import CustomButton from '@/components/common/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import {i18n} from '@/i18n';

const ConversationScreen: React.FC<MessageNavigationProps> = ({
  navigation,
  route: {
    params: {chat},
  },
}) => {
  const {
    participants,
    messages,
    message,
    scollEnd,
    previewVisible,
    imageIndex,
    images,
    conversation,
    isLoadingMessage,
    refetch,
    setMessage,
    setPreviewVisible,
    sendMessageCallback,
    isMe,
    showImage,
    loadImage,
    setRef,
    scrollToend,
    downloadImage,
    setPaginate,
  } = useConv(chat);

  return (
    <>
      <ImageView
        images={images}
        imageIndex={imageIndex}
        visible={previewVisible}
        presentationStyle="overFullScreen"
        HeaderComponent={({imageIndex}) => {
          return (
            <View className="flex flex-row justify-end pt-2">
              <CustomButton
                className=""
                onPress={() => downloadImage(images[imageIndex].uri)}>
                <Feather name="download" size={26} color={'white'} />
              </CustomButton>
              <CustomButton
                className=""
                onPress={() => setPreviewVisible(false)}>
                <Ionicons name="close" size={26} color={'white'} />
              </CustomButton>
            </View>
          );
        }}
        onRequestClose={() => setPreviewVisible(false)}
      />
      <View className="w-full flex-1 h-full ">
        <Appbar.Header elevated>
          <View className="w-full pb-2 h-[80px] pt-2">
            <View className="w-full justify-start px-4 flex-row py-2">
              <View className="h-full mt-2">
                <MyCustomButton onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={26} color={'#01010175'} />
                </MyCustomButton>
              </View>
              <View className="py-1 mr-4 flex ml-5">
                <Avatar
                  size={36}
                  rounded
                  source={
                    participants.length > 1
                      ? require('./../../../../assets/images/group.png')
                      : {
                          uri: `${getFileUrl(
                            participants.length > 0
                              ? participants[0].image
                              : '',
                          )}`,
                        }
                  }
                />
                {participants.length === 1 &&
                  participants[0].state?.status === UserStateEnum.Online && (
                    <View className="w-[10px] h-[10px] bg-[#009686] absolute bottom-1 right-1 rounded-lg"></View>
                  )}
              </View>
              <View className="flex-1 px-1">
                <View className="pt-2">
                  <CustomText className="font-bold text-[#01010175]">
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
                <View className="mt-1">
                  <CustomText className="text-[12px] text-[#01010175]">
                    {participants.length === 1
                      ? moment(participants[0].state?.updatedAt).format('HH:MM')
                      : ''}
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        </Appbar.Header>
        <View className="pb-[42px] h-full" style={{opacity: scollEnd}}>
          <FlatList
            refreshing={false}
            onScrollToTop={e => {
              console.log('Top');
            }}
            ListHeaderComponent={
              <View className="d-flex h-[40px] justify-center w-full ">
                <CustomButton
                  onPress={() => {
                    setPaginate(p => ({...p, limit: p.limit + 20}));
                  }}
                  loading={isLoadingMessage}
                  className="text-center text-[#009686] capitalize">
                  {i18n.t('more-chat')}
                </CustomButton>
              </View>
            }
            showsVerticalScrollIndicator={false}
            ref={r => setRef(r)}
            onRefresh={() => refetch()}
            onContentSizeChange={() => scrollToend()}
            keyExtractor={k => `${k.id}-${uuid.v4()}`}
            data={messages}
            className={`px-3 ${
              message.files.length > 0 ? 'mb-[210px]' : 'mb-[126px]'
            }`}
            renderItem={({item}) => {
              return isMe(item) ? (
                <MyMessageItem onViewImage={showImage} message={item} />
              ) : (
                <IncoMessageItem onViewImage={showImage} message={item} />
              );
            }}
          />
        </View>
        <View
          className={`w-full bg-[#ccfaf250] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] pb-2 ${
            message.files.length > 0 ? 'h-[160px]' : 'h-[80px]'
          } absolute bottom-0`}>
          <FlatList
            data={message.files}
            horizontal
            contentContainerStyle={{justifyContent: 'flex-end'}}
            renderItem={({item}) => (
              <View className="relative h-[80px] w-[80px] mx-1 mt-1">
                <FastImage
                  className="h-[80px] w-[80px] rounded-md"
                  resizeMode={FastImage.resizeMode.cover}
                  source={{uri: item.uri}}
                />
                <View className="absolute top-0 right-0">
                  <MyCustomButton
                    onPress={() => {
                      setMessage(prev => ({
                        ...prev,
                        files: prev.files.filter(p => p !== item),
                      }));
                    }}>
                    <Ionicons size={20} color="red" name="close" />
                  </MyCustomButton>
                </View>
              </View>
            )}
          />
          <View className="w-full justify-between px-4 flex-row py-3">
            <View className="flex-1 px-2 flex-row">
              <View className="flex-1 ps-2 ">
                <CustomInput
                  placeholder="message"
                  containerStyle={{height: 40, borderRadius: 20}}
                  value={message.content}
                  // onFocus={scrollToend}
                  onChangeText={m =>
                    setMessage(p => ({
                      ...p,
                      content: m,
                      conversationId: conversation?.id,
                    }))
                  }
                />
              </View>
            </View>
            <View className="flex flex-row pt-2">
              <View className="mr-2">
                <MyCustomButton onPress={loadImage}>
                  <Ionicons size={26} color={Constant.baseColor} name="image" />
                </MyCustomButton>
              </View>
              <View className="mx-1">
                <MyCustomButton
                  onPress={() => sendMessageCallback(message, messages)}>
                  <Ionicons
                    size={26}
                    color={Constant.baseColor}
                    name="send-sharp"
                  />
                </MyCustomButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ConversationScreen;
