import {Button, ButtonProps} from 'react-native-paper';

const CustomButton = ({...props}: Omit<ButtonProps,"theme">) => {
  return (
    <Button
      {...props}
      labelStyle={{
        fontFamily: 'Montserrat-Regular',
        ...((props.labelStyle as object | null) ?? {}),
      }}
    />
  );
};

export default CustomButton;
