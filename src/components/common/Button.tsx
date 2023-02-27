import {TouchableNativeFeedbackProps} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const MyCustomButton = (props: TouchableNativeFeedbackProps) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('rgba(0, 96, 86, 0.04)', true,40)}
      accessibilityRole="button"
      accessibilityState={{selected: true}}
      {...props}
    />
  );
};

export default MyCustomButton;
