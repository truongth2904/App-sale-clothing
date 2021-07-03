import * as React from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import { Card } from 'react-native-paper';
import UserContext from '../contexts/UserContext.js';
import { getAllNotificationUser } from '../FirebaseConnect';

export default function App({ navigation }) {
  const { user } = React.useContext(UserContext);
  const [listNotication, setListNotication] = React.useState([]);

  const getAllNotificationUserAync = async () => {
    let list = await getAllNotificationUser(user);
    setListNotication(list);
  };

  const checkUser = () => {
    if (!user) {
      alert('Vui lòng đăng nhập !');
      navigation.navigate('HomeScreen');
      return;
    }
  };
  checkUser();
  React.useEffect(() => {
    getAllNotificationUserAync();
  }, []);

  return (
    <ScrollView>
     
      <FlatList
        renderItem={({ item }) => (
          <View>
            <View
              style={{
                backgroundColor: '#00FFFF',
                shadowColor: '#000',
                margin: 5,
                padding: 10,
                borderRadius: 8,
              }}>
              {item.type === 'Bill' ? (
                <View>
                  <Text>Đơn hàng</Text>
                  <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                </View>
              ) : (
                <View>
                  <Text>Có sản phẩm mới</Text>
                  <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                </View>
              )}
            </View>
          </View>
        )}
        data={listNotication}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
