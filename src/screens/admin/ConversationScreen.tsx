import {
  ScrollView,
  StatusBar,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {useEffect} from 'react';
import {Avatar} from '@rneui/themed';

import {ConversationNavigationProps} from '@/config/navigation';
import CustomInput from '@/components/common/CustomInput';
import {ConversationTab} from '@/routes/RouteNavigation';
import uuid from 'react-native-uuid';

const ConversationScreen: React.FC<ConversationNavigationProps> = ({
  navigation,
}) => {
  useEffect(() => {
    // navigation
    //   .getParent<
    //     NativeStackNavigationProp<RootNavigationProps, 'Home', undefined>
    //   >()
    //   .navigate('SignIn');
  }, [navigation]);
  return (
    <>
      <StatusBar barStyle="default" backgroundColor="#16133f" />
      <View className="w-full flex-1 h-full">
        <View className="w-full bg-[#16133f] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] pb-2">
          <View className="w-full justify-between px-4 flex-row py-3">
            <View className="py-2 mr-4">
              <Avatar
                size={36}
                rounded
                source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
              />
            </View>
            <View className="flex-1 px-2">
              <View style={{height: 20}}>
                <CustomInput placeholder="search" />
              </View>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-2 py-1">
            {[...Array(10).keys()].map(e => {
              return (
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    '#acacac',
                    true,
                    40,
                  )}
                  accessibilityRole="button"
                  onPress={() => {}}
                  onLongPress={() => {}}
                  accessibilityState={{selected: true}}
                  accessibilityLabel={`Name-${e}`}
                  testID={`user-connected-item-${uuid.v4()}`}
                  key={`user-connected-item-${uuid.v4()}`}>
                  <View className="px-3 rounded-lg">
                    <Avatar
                      size={56}
                      rounded
                      source={{
                        uri: 'https://randomuser.me/api/portraits/men/36.jpg',
                      }}>
                      <View className="w-[10px] h-[10px] bg-green-500 absolute bottom-1 right-1 rounded-lg"></View>
                    </Avatar>
                    <View className="w-full justify-center items-center">
                      <Text className="text-sm text-[#7e7e7e]">Name</Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </ScrollView>
        </View>
        <ConversationTab />
      </View>
    </>
  );
};

export default ConversationScreen;
