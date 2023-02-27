import {User} from '@/@types/data';
import MyCustomButton from '@/components/common/Button';
import CustomText from '@/components/common/CustomText';
import {getFileUrl} from '@/utils/storage';
import {Avatar} from '@rneui/themed';
import {TouchableNativeFeedback, View} from 'react-native';
import Animated, {Layout} from 'react-native-reanimated';

type Props = {
  user: User;
  onClick: () => void;
};

const UserItem = ({user, onClick}: Props) => {
  return (
    <MyCustomButton
      onPress={onClick}
      background={TouchableNativeFeedback.Ripple('#009687', false)}>
      <Animated.View
        layout={Layout.springify()}
        className="my-[2px] flex flex-row  py-3 px-2 rounded-md mx-2">
        <Avatar
          size={36}
          rounded
          source={{uri: `${getFileUrl(user.image ?? '')}`}}
        />
        <View className="flex flex-auto">
          <CustomText className="font-bold py-2 text-[#2b2b2b] px-4 capitalize ">
            {user.username}
          </CustomText>
        </View>
      </Animated.View>
    </MyCustomButton>
  );
};

export default UserItem;
