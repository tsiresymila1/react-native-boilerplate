import {Text, TextProps} from 'react-native';

const CustomText = (props: TextProps) => {
  return (
    <Text
      {...props}
      className={`font-['Montserrat-Regular'] text-white ${props.className}`}></Text>
  );
};

export default CustomText;
