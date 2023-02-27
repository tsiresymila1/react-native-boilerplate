import CustomText from '@/components/common/CustomText';
import {getFileUrl} from '@/utils/storage';
import uuid from 'react-native-uuid';
import { TouchableNativeFeedback, View} from 'react-native';
import Animated, {
  Layout,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import {Message} from '@/@types/data';
import Constant from '@/helpers/constant';
import {ActivityIndicator} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

type Props = {message: Message; onViewImage: (content: string) => void};

const MyMessageItem = ({message, onViewImage}: Props) => {
  return (
    <Animated.View
      // entering={BounceInDown.duration(10)}
      layout={Layout.springify()}
      className="my-1 flex flex-row  w-full justify-end">
      {message.type === 2 && (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 150, 136, 0.04)',
            false,
          )}
          accessibilityRole="button"
          onPress={() => onViewImage(message.content ?? '')}
          onLongPress={() => {}}
          accessibilityState={{selected: true}}
          testID={`user-connected-item-${uuid.v4()}`}
          key={`user-connected-item-${uuid.v4()}`}>
          <View className=" p-0">
            <FastImage
              className="h-[260px] w-[50vw] rounded-xl"
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: message.content?.startsWith('file//')
                  ? message.content ?? ''
                  : getFileUrl(message.content ?? ''),
              }}
            />
          </View>
        </TouchableNativeFeedback>
      )}
      {message.type === 0 && (
        <View className="bg-[#009688] py-3 px-4 rounded-3xl">
          <CustomText>{message.content}</CustomText>
        </View>
      )}
      <View className="px-2 pt-5 items-end flex">
        {message.id === 0 ? (
          <ActivityIndicator color={Constant.baseColor} size={10} />
        ) : (
          <Feather name="check-circle" color={Constant.baseColor} size={12} />
        )}
      </View>
    </Animated.View>
  );
};

export default MyMessageItem;
