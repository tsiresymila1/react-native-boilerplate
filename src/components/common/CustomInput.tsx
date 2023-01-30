import {Input, InputProps} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import Constant from '@/helpers/constant';

type Props = Omit<InputProps, 'ref'> & {
  ref?: any;
};
const CustomInput = ({containerStyle, ...props}: Props) => {
  return (
    <Input
      {...props}
      placeholderTextColor={Constant.placeholderBaseColor}
      leftIconContainerStyle={{marginLeft: 8, marginEnd: 4}}
      inputContainerStyle={{borderBottomWidth: 0, padding: 0, marginTop: 24}}
      containerStyle={{...styles.input, ...((containerStyle as object | null) ?? {})}}
      style={{
        fontSize: 15,
        color: Constant.textBaseColor,
        fontFamily: 'Montserrat-Regular',
      }}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 48,
    justifyContent: 'center',
    backgroundColor: Constant.secondColor,
    borderWidth: 0,
    fontSize: 14,
    color: 'white',
    borderRadius: 8,
  },
});
