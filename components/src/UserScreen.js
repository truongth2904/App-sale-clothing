import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProduct, getAllUser } from '../FirebaseConnect';
import UserContext from '../contexts/UserContext.js';

export default function App({ navigation }) {
  const { user, setUser } = React.useContext(UserContext);
  const [displayManager, setDisplayManager] = useState(true);
 // {setUser(null)}
  return (
    <ScrollView>
    
      {user &&
        (user.power === '9' ? (
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.funtionTitle}>Chức năng admin</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ManageProduct');
                }}
                style={styles.buttonFunc}>
                <Text style={{ fontWeight: 'bold' }}>Quản lý sản phẩm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ManageBill');
                }}
                style={styles.buttonFunc}>
                <Text style={{ fontWeight: 'bold' }}>Quản lý hóa đơn</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ManageBilled');
                }}
                style={styles.buttonFunc}>
                <Text style={{ fontWeight: 'bold' }}>
                  Xem các hóa đơn đã được duyệt
                </Text>
              </TouchableOpacity>
            </View>
            <FuncUser navigation={navigation} />
          </View>
        ) : (
          <View>
            <FuncUser navigation={navigation} />
          </View>
        ))}
    </ScrollView>
  );
}
function FuncUser({ navigation }) {
  return (
    <View>
      <Text style={styles.funtionTitle}>Chức năng người dùng</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('ListBillUser')}
        style={styles.btnFuncUser}>
        <Text>Xem các đơn hàng đã đặt</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('BillReceived')}
        style={styles.btnFuncUser}>
        <Text>Xem các đơn hàng đã nhận</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  btnFuncUser: {
    borderWidth: 2,
    borderColor: 'black',
    width: 200,
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 5,
  },
  buttonFunc: {
    borderWidth: 2,
    borderColor: 'black',
    width: 250,
    margin: 5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  funtionTitle: { textAlign: 'center', fontWeight: 'bold', color: 'red' },
});
