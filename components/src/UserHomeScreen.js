import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Ionicons,
  FontAwesome5,
  FontAwesome,
  Fontisto,
  AntDesign,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailProduct from './DetailProduct';
const Stack = createStackNavigator();

import UserContext from '../contexts/UserContext.js';
import { getAllUser, deleteUser, updateUser } from '../FirebaseConnect';

export default function App({ navigation }, props) {
  const { user, setUser } = React.useContext(UserContext);

  const [description, setDescription] = React.useState(user.description);
  const [name, setName] = React.useState(user.name);
  const [image, setImage] = React.useState(user.image);

  const clickSave = () => {
    if (name === '') {
      alert('Không được để tên trống');
      return;
    }
    let userNew = {
      id: user.id,
      description: description,
      name: name,
      password: user.password,
      username: user.username,
      power: user.power,
      image: image,
    };
    updateUser(userNew);
    alert('Đã cập nhật thành công');
    setUser(userNew);
  };

  return (
    <View>
      <View style={{ width: 335 }}>
        <Image
          style={{ width: 320, height: 100 }}
          source={{ uri: user.image }}
        />
        <TextInput
          onChangeText={(value) => setName(value)}
          value={name}
          style={{
            fontWeight: 'bold',
            marginTop: 10,
            fontSize: 20,
            alignItems: 'center',
          }}
        />

        <View style={styles.titleuser}>
          <Text>Mô tả: </Text>
          <TextInput
            placeholder="Mô tả"
            onChangeText={(value) => setDescription(value)}
            value={description}
          />
        </View>

        <View style={styles.titleuser}>
          <Text>Link hình ảnh: </Text>
          <TextInput
            placeholder="Link hình ảnh"
            onChangeText={(value) => setImage(value)}
            value={image}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => clickSave()}
          style={{
            width: 100,
            height: 30,
            backgroundColor: 'green',
            marginTop: 30,
          }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('UserScreenStack');
            navigation.navigate('UserScreen');
            navigation.navigate('HomeScreen');

            await AsyncStorage.removeItem('@storage_username');
            setUser(null);
          }}
          style={{
            borderColor: 'black',
            borderWidth: 2,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleuser: { flexDirection: 'row' },
});
