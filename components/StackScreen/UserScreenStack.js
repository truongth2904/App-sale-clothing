import React, { useState, useEffect } from 'react';
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

import CartScreen from '../src/CartScreen';
import DetailProduct from '../src/DetailProduct';
import UserScreen from '../src/UserScreen';
import RegistrationScreen from '../src/RegistrationScreen';
import UserHomeScreen from '../src/UserHomeScreen';
import ManageProduct from '../manage/ManageProduct';
import ManageBill from '../manage/ManageBill';
import ManageBilled from '../manage/ManageBilled';
import ListBillUser from '../src/ListBillUser';
import BillReceived from '../src/BillReceived';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAllUser } from '../FirebaseConnect';

const Stack = createStackNavigator();
import UserContext from '../contexts/UserContext.js';
export default function UserScreenStack({ navigation, props }) {
  const { user, setUser } = React.useContext(UserContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              {!user ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RegistrationScreen');
                  }}>
                  <Text style={{ fontWeight: 'bold' }}>
                    Đăng nhập / Đăng ký
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('UserHomeScreen');
                    }}>
                    <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
                  </TouchableOpacity>
                 
                </View>
              )}
            </View>
          ),
        }}
        name="UserScreen"
        component={UserScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', marginRight: 25 }}>
                Đăng ký
              </Text>
            </View>
          ),
        }}
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: () => <View style={{ alignItems: 'center' }}></View>,
        }}
        name="UserHomeScreen"
        component={UserHomeScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: 'center' }}>
              <Text>QUẢN LÝ SẢN PHẨM</Text>
            </View>
          ),
        }}
        name="ManageProduct"
        component={ManageProduct}
      />
  
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: 'center' }}>
              <Text>QUẢN LÝ HÓA ĐƠN</Text>
            </View>
          ),
        }}
        name="ManageBill"
        component={ManageBill}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: 'center' }}>
              <Text>CÁC HÓA ĐƠN ĐÃ DUYÊT</Text>
            </View>
          ),
        }}
        name="ManageBilled"
        component={ManageBilled}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: 'center' }}>
              <Text>Danh sách đơn hàng</Text>
            </View>
          ),
        }}
        name="ListBillUser"
        component={ListBillUser}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: 'center' }}>
              <Text>Danh sách đơn hàng</Text>
            </View>
          ),
        }}
        name="BillReceived"
        component={BillReceived}
      />
    </Stack.Navigator>
  );
}
