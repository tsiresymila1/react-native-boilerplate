import CustomText from '@/components/common/CustomText';
import {getFileUrl} from '@/utils/storage';
import {TouchableNativeFeedback, View} from 'react-native';
import uuid from 'react-native-uuid';
import Animated, {Layout} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

type Props = {message: any; onViewImage: (content: string) => void};

const IncoMessageItem = ({message, onViewImage}: Props) => {
  return (
    <Animated.View
      // entering={FadeIn.springify()}
      layout={Layout.springify()}
      className="my-1 flex flex-row  w-full">
      {message.type === 2 && (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 150, 136, 0.04)',
            false,
          )}
          accessibilityRole="button"
          onPress={() => onViewImage(message.content)}
          onLongPress={() => {}}
          accessibilityState={{selected: true}}
          testID={`user-connected-item-${uuid.v4()}`}
          key={`user-connected-item-${uuid.v4()}`}>
          <View className="p-0">
            <FastImage
              className=" h-[260px] w-[50vw] rounded-xl"
              resizeMode={FastImage.resizeMode.cover}
              source={{uri: getFileUrl(message.content)}}
            />
          </View>
        </TouchableNativeFeedback>
      )}
      {message.type === 0 && (
        <View className="bg-[#ffffffff] border-[1px] border-[#20202010] py-3 px-4 rounded-3xl">
          <CustomText className='text-[#2b2b2b]'>{message.content}</CustomText>
        </View>
      )}
    </Animated.View>
  );
};

export default IncoMessageItem;
