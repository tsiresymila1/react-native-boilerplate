import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeDrawerContent from '@/components/admin/drawer/DrawerContent';
import {HomeDrawerNavigationProps} from '@/@types/navigations/RootNavigationProps';
import AdminHomeNavigation from './AdminHomeNavigtaion';
import { HomeNavigationProps } from '@/config/navigation';

const HomeDrawer = createDrawerNavigator<HomeDrawerNavigationProps>();

const AdminDrawerNavigation: React.FC<HomeNavigationProps> = ({navigation}) => {
  return (
    <HomeDrawer.Navigator drawerContent={HomeDrawerContent}>
      <HomeDrawer.Screen
        options={{
          headerShown: false,
          drawerStyle: {
            // backgroundColor: Constant.baseColor,
          },
        }}
        name="Home"
        component={AdminHomeNavigation}
      />
    </HomeDrawer.Navigator>
  );
};

export default AdminDrawerNavigation;
