import {Chat, User} from '@/@types/data';
import {AdminNavigationProps} from '@/@types/navigations/RootNavigationProps';
import UserItem from '@/components/admin/search/UserItem';
import CustomInput from '@/components/common/CustomInput';
import {useAppSelector} from '@/hooks/redux';
import {useLoadConversationMutation} from '@/redux/api/chat/post';
import {useSeachUserQuery} from '@/redux/api/user/get';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback, useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';

const AppbarBackAction = Appbar.BackAction as any;
type Props = NativeStackScreenProps<AdminNavigationProps, 'SearchModal'>;

const SearchModalScreen: React.FC<Props> = ({navigation}) => {
  const [textInpuref, setTextInpuref] = useState<TextInput | null>(null);
  const [query, setQuery] = useState<string>('');
  const [loadConversation] = useLoadConversationMutation();

  const auth = useAppSelector(state => state.auth);
  const {data: users} = useSeachUserQuery({query});

  const goToMessage = (chat: Chat) => {
    navigation.replace('Message', {chat});
  };

  const loadChat = useCallback(
    (id: number | string) => {
      const myid = auth.user?.id.toString() ?? '';
      const ids = [id, myid];
      loadConversation({keys: ids}).then((response: any) => {
        if (response && response.data) {
          const conversation = response.data.data;
          goToMessage(conversation);
        }
      });
    },
    [auth],
  );

  useEffect(() => {
    if (textInpuref) {
    }
  }, [textInpuref]);
  return (
    <View className="w-full h-full flex flex-col">
      <Appbar.Header elevated>
        <View className=" pr-4 flex flex-row">
          <AppbarBackAction onPress={() => navigation.goBack()} />
          <View className="flex flex-shrink flex-auto mt-1">
            <CustomInput
              placeholder="search"
              ref={ref => setTextInpuref(ref)}
              onChangeText={v => setQuery(v)}
              containerStyle={{height: 40}}
            />
          </View>
        </View>
      </Appbar.Header>
      <View className="w-full">
        <FlatList
          className="h-full"
          data={(users?.data ?? []) as User[]}
          keyExtractor={i => `${i.id}`}
          renderItem={({item}) => (
            <UserItem user={item} onClick={() => loadChat(item.id)} />
          )}
        />
      </View>
    </View>
  );
};

export default SearchModalScreen;
