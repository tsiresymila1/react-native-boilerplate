import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <View className="w-full flex-row h-[60px]  bg-[#16133f] justify-center shadow-[35px_12px_60px_-15px_rgba(0,0,0,0.8)]">
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const color: string = isFocused ? '#673ab7' : '#7e7e7e';
        const size: number = isFocused ? 26 : 24;

        return (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#1e1958', false)}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={`tab-item-${index}`}
            onLongPress={onLongPress}>
            <View className="flex-1 justify-center items-center">
              <View className="justify-center">
                <View className="">
                  {options.tabBarIcon ? (
                    <>
                      {options.tabBarIcon({
                        focused: isFocused,
                        color: color,
                        size: size,
                      })}
                    </>
                  ) : (
                    <>
                      <FontAwesome name="search" size={size} color={color} />
                    </>
                  )}
                </View>
                <Text style={{color: color}}>{label.toString()}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
