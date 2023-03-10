import {Image, ImagePropsBase} from 'react-native';

const Logo = (props: Omit<ImagePropsBase, 'source'>) => {
  return (
    <Image
      source={require('../../assets/images/logo.png')}
      className="h-[180px]"
      resizeMode="contain"
      {...props}
    />
  );
};
export default Logo;
