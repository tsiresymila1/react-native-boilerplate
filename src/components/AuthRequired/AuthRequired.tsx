import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { SignInNavigationProps } from "@/config/navigation";
import { useAppSelector } from "@/hooks/redux";

const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const { navigation } = useNavigation<SignInNavigationProps>();

  const useAuthToken = useAppSelector(state => state.auth)

  useEffect(() => {
      if (!useAuthToken.token) {
        console.log('isExecuted');
        navigation.replace("SignIn")
      }
  }, [navigation,useAuthToken]);

  return children;
};

export default AuthRequired;
