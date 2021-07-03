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
import { setBillStatus, setNotificationUser } from '../FirebaseConnect';
const Stack = createStackNavigator();

import {
  getAllProduct,
  addProduct,
  updateProduct,
  getAllBill,
  objectToArray,
  getUserFromId,
  deleteBill,
} from '../FirebaseConnect';

export default function App({ navigation }) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const getAllBillAync = async () => {
    const products = await getAllBill();
    setData(products);
    // console.log(products[0].products);
  };
  const getTongBill = (bill) => {
    let tong = 0;
    bill.products.forEach((product) => {
      tong += product.num * product.price;
    });
    return tong;
  };
  useEffect(() => {
    getAllBillAync();
  }, []);

  return (
    <ScrollView>
      <FlatList
        renderItem={({ item }) => (
          <View>
            {item.status === 0 && (
              <View
                style={{
                  margin: 8,
                  shadowColor: '#000',
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  backgroundColor: 'white',
                  padding: 5,
                }}>
                <Text>Tên: {item.name}</Text>
                <Text>Mã đơn hàng: {item.id}</Text>
                <View style={{ backgroundColor: '#CCFF33' }}>
                  <FlatList
                    data={item.products}
                    renderItem={(item) => (
                      <View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            borderColor: 'black',
                            borderWidth: 1.5,
                            margin: 1,
                          }}>
                          <View>
                            <View>
                              <Text style={{ fontSize: 10 }}>
                                Mã {item.item.product_id}
                              </Text>
                              <Text style={{ fontWeight: 'bold' }}>
                                {item.item.name}
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                marginLeft: 20,
                                textAlign: 'center',
                                justifyContent: 'center',
                              }}>
                              Số lượng: {item.item.num}
                            </Text>
                          </View>
                        </View>
                        <Text>
                          Giá tiền:
                          {parseFloat(parseInt(item.item.num * item.item.price))
                            .toFixed(0)
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                        </Text>
                      </View>
                    )}
                  />
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Tổng:
                    {parseFloat(parseInt(getTongBill(item)))
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    VND
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginTop: 3,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setBillStatus(item);
                      console.log(item);

                      alert('Duyệt thành công !');

                      getAllBillAync();
                    }}
                    style={{
                      backgroundColor: '#0000FF',
                      width: 100,
                      height: 30,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <Text style={{ fontWeight: 'bold' }}>Duyệt đơn</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setNotificationUser(
                        { id: item.id_user },
                        {
                          status: 0,
                          title: 'Có đơn hàng bị hủy' + item.id,
                          type: 'Bill',
                        }
                      );
                      deleteBill(item);
                      alert('Xóa thành công !');
                      getAllBillAync();
                    }}
                    style={{
                      backgroundColor: '#0000FF',
                      width: 100,
                      height: 30,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <Text style={{ fontWeight: 'bold' }}>Xóa đơn</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
        data={data}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
