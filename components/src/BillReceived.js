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
import { setBillStatus } from '../FirebaseConnect';
const Stack = createStackNavigator();
import {
  getAllProduct,
  addProduct,
  updateProduct,
  getAllBill,
  objectToArray,
  getUserFromId,
  deleteBill,
  getAllBillUser,
} from '../FirebaseConnect';
import UserContext from '../contexts/UserContext.js';

export default function App() {
  const { user } = React.useContext(UserContext);
  const [dataDisplay, setDataDisplay] = useState([]);
  const [orderStatus, setrOderStatus] = useState('allOrder');

  const getAllBillUserAync = async () => {
    let list = await getAllBillUser(user);
    setDataDisplay(list.filter((o) => o.status === 2));
  };

  const getTongBill = (bill) => {
    let tong = 0;
    bill.products.forEach((product) => {
      tong += product.num * product.price;
    });
    return tong;
  };

  React.useEffect(() => {
    getAllBillUserAync();
  }, []);

  return (
    <ScrollView>
      <FlatList
        data={dataDisplay}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 5,
              shadowColor: '#000',
              shadowOpacity: 1,
              shadowRadius: 3.84,
              marginBottom: 20,
            }}>
            <Text>Mã đơn hàng: {item.id}</Text>
            <View
              style={{
                backgroundColor: '#CCFF33',
                shadowColor: '#000',
                shadowOpacity: 1,
                shadowRadius: 3.84,
              }}>
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
                      <Text>
                        Giá tiền:
                        {parseFloat(parseInt(item.item.num * item.item.price))
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                      </Text>
                    </View>
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
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
