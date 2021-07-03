import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Button,
  ToastAndroid,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {
  getAllProduct,
  getProductInCart,
  objectToArray,
  setNumInproductUserDown,
  setNumInproductUserUp,
  addProductInCart,
  deleteProductInCart,
  addBillToUser,
  deleteAllProductInCart,
  setNotificationUser,
} from '../FirebaseConnect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../contexts/UserContext.js';

export default function App({ navigation, props }) {
  const { user } = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [moneyCart, setMoneyCart] = useState(0);

  const checkUser = () => {
    if (!user) {
      alert('Vui lòng đăng nhập !');
      navigation.navigate('HomeScreen');
      return;
    }
  };
  checkUser();

  const getProductInCartAsync = async () => {
    const products = await getProductInCart(user);

    let tong = 0;
    products.forEach((o) => {
      tong += parseInt(o.num) * parseInt(o.price);
    });
    setData(products);
    setMoneyCart(tong + '');
  };
  React.useEffect(() => {
    getProductInCartAsync();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={{ textAlign: 'center' }}>
        {data.length === 0 ? 'Không có sản phẩm nào !' : ''}
      </Text>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => (
          <View style={styles._renderItem}>
            <Image
              style={{ width: 120, height: 180 }}
              source={{ uri: item.image }}
            />
            <View>
              <Text
                numberOfLines={10}
                style={{  
                  marginTop: 10,
                  fontWeight: 'bold',
                  width: 180,
                  marginLeft: 5,
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 10,
                }}>
                {item.price * item.num} VND
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setNumInproductUserDown(user, item);
                    getProductInCartAsync();
                  }}
                  style={styles.buttonUpDown}>
                  <Text>-</Text>
                </TouchableOpacity>

                <Text
                  style={{
                    width: 30,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}>
                  {item.num}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setNumInproductUserUp(user, item);
                    getProductInCartAsync();
                  }}
                  style={styles.buttonUpDown}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  borderWidth: 2,
                  borderColor: 'black',
                }}
                onPress={() => {
                  deleteProductInCart(user, item);
                  getProductInCartAsync();
                }}>
                <Text>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.fullPriceProducts}>
          Tổng tiền:
          {parseFloat(moneyCart)
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Text>

        <TouchableOpacity
          onPress={() => {
            if (data.length === 0) {
              alert('Không có sản phẩm để đặt hàng !');
            } else {
              if (deleteAllProductInCart(user)) {
                addBillToUser(user, data);
                setNotificationUser(user, {
                  status: 0,
                  title: 'Bạn đã đặt hàng vào lúc ' + new Date(),
                  type: 'Bill',
                });
                alert('Đã đặt hàng thành công vui lòng chờ xác nhận từ admin');
                setData([]);
                setMoneyCart(0);
              }
            }
          }}
          style={{
            width: 300,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            backgroundColor: 'red',
            marginTop: 10,
          }}>
          <Text style={{ fontWeight: 'bold' }}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonUpDown: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',

    fontSize: 20,
  },

  _renderItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    width: 300,
  },
  fullPriceProducts: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
