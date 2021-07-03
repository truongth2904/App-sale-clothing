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
  Picker,
  Button,
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

const Stack = createStackNavigator();

import {
  getAllProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProductInCart,
  getAllUser,
  getAllCart,
  deletetAllCart,
  setNotificationUser,
} from '../FirebaseConnect';

export default function App() {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = React.useState(true);
  const [isAdd, setIsAdd] = React.useState(false);
  const [isClear, setIsClear] = React.useState(false);
  const [users, setUsers] = useState([]);

  const [id, setId] = useState('');
  const [name, setname] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('Nam');
  const [price, setPrice] = useState('');

  const getUserAsync = async () => {
    const users = await getAllUser();
    setUsers(users);
    users.forEach((o) => {
      setNotificationUser(o, {
        status: 0,
        title:  name,
        type: 'ProductNew',
      });
    });
  };

  const deleteItem = (item) => {
    deleteProduct(item.id);
    getProductAsync();
    deletetAllCart(item.id);
    clearText();
  };
  const addProductItem = () => {
    if (name === '') return;
    if (description === '') return;
    if (image === '') return;
    if (price === '') return;

    addProduct({
      description: description,
      evalute: 5,
      image: image,
      name: name,
      price: price,
      type: type,
    });
    getUserAsync();
    getProductAsync();
    alert('Đã thêm thành công !');
    clearText();
  };
  const editProduct = () => {
    if (name === '') return;
    if (description === '') return;
    if (image === '') return;
    if (price === '') return;
    let newData = [...data];

    updateProduct({
      id: id,
      description: description,
      evalute: 5,
      image: image,
      name: name,
      price: price,
      type: type,
    });
    getProductAsync();
    alert('Đã sửa thành công !');
    clearText();
  };
  const selectedItem = (item) => {
    setId(item.id);
    setname(item.name);
    setDescription(item.description);
    setImage(item.image);
    setType(item.type);
    setPrice(item.price);
    setIsEdit(false);
    setIsAdd(true);
  };
  const clearText = () => {
    setId('');
    setname('');
    setDescription('');
    setImage('');
    setType('Nam');
    setPrice('');
    setIsEdit(true);
    setIsAdd(false);
  };
  const getProductAsync = async () => {
    const products = await getAllProduct();
    setData(products);
  };
  useEffect(() => {
    getProductAsync();
  }, []);

  return (
    <ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={styles.textinput}
          placeholder="Nhập tên sản phẩm"
          value={name}
          onChangeText={(value) => setname(value)}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Nhập mô tả sản phẩm"
          value={description}
          onChangeText={(value) => setDescription(value)}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Nhập link hình ảnh sản phẩm"
          value={image}
          onChangeText={(value) => setImage(value)}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Nhập giá sản phẩm"
          value={price}
          onChangeText={(value) => setPrice(value)}
        />
        <Picker
          selectedValue={type}
          style={{ height: 25, width: 300, alignItems: 'center', marginTop: 5 }}
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
          <Picker.Item label="Nam" value="Nam" />
          <Picker.Item label="Nữ" value="Nữ" />
          <Picker.Item label="Trẻ em" value="Trẻ em" />
        </Picker>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 5,
          }}>
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles._button}>
              <Button
                disabled={isAdd}
                onPress={() => addProductItem()}
                title="Thêm"
              />
            </View>
            <View style={styles._button}>
              <Button
                onPress={() => editProduct()}
                disabled={isEdit}
                title="Sửa"
              />
            </View>
            <View style={styles._button}>
              <Button
                disabled={isClear}
                onPress={() => clearText()}
                title="Xóa trắng"
              />
            </View>
          </View>
        </View>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => selectedItem(item)}
            style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity>
              <Image
                style={{ width: 90, height: 110 }}
                source={{ uri: item.image }}
              />
            </TouchableOpacity>

            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginTop: 3,
                    color: '#EE0000',
                  }}>
                  {parseFloat(parseInt(item.price))
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  VND
                </Text>
                <TouchableOpacity
                  onPress={() => deleteItem(item)}
                  style={styles.buttonDelete}>
                  <Text style={{ fontWeight: 'bold' }}>XÓA</Text>
                </TouchableOpacity>
              </View>

              <Text
                numberOfLines={10}
                style={{
                  fontSize: 9,
                  marginTop: 5,
                  width: 200,
                }}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderColor: 'black',
    marginTop: 5,
    borderWidth: 2,
    width: 300,
    height: 25,
  },
  buttonDelete: {
    width: 50,
    height: 20,
    backgroundColor: '#FFFF00',
    textAlign: 'center',
    marginLeft: 25,
    marginTop: 3,
  },
});
