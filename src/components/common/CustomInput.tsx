import {Input, InputProps} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import Constant from '../../helpers/constant';

type Props = Omit<InputProps, 'ref'> & {
  ref?: any;
};
const CustomInput = (props: Props) => {
  return (
    <Input
      placeholderTextColor={Constant.placeholderBaseColor}
      leftIconContainerStyle={{marginLeft: 8, marginEnd: 4}}
      inputContainerStyle={{borderBottomWidth: 0, padding: 0, marginTop: 24}}
      containerStyle={styles.input}
      style={{fontSize: 15, color:Constant.textBaseColor}}
      {...props}
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