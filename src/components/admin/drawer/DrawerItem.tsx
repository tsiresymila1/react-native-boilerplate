import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyCustomButton from '@/components/common/Button';
import CustomText from '@/components/common/CustomText';

type Props = {
  title: string;
  onClick?: () => void;
};

const DrawerItem = ({title, onClick}: Props) => {
  return (
    <View className="flex px-2 py-2">
      <MyCustomButton
        className="py-4 px-4 flex flex-row bg-[#97979711] mt-2 rounded-md"
        onPress={onClick}>
        <MaterialIcons name="logout" size={20} color="#009686" />
        <CustomText className="ml-3 text-[#009686]">{title}</CustomText>
      </MyCustomButton>
    </View>
  );
};

export default DrawerItem;
