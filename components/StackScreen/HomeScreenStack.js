import * as React from 'react';
import {
  Ionicons,
  FontAwesome5,
  FontAwesome,
  Fontisto,
  AntDesign,
} from '@expo/vector-icons';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../src/HomeScreen';
import CartScreen from '../src/CartScreen';
import CategoryScreen from '../src/CategoryScreen';
import LoveScreen from '../src/LoveScreen';
import NewScreen from '../src/NewScreen';
import UserScreen from '../src/UserScreen';
import DetailProduct from '../src/DetailProduct';
import MailScreen from '../src/MailScreen';
import QRScreen from '../src/QRScreen';
import RegistrationScreen from '../src/RegistrationScreen';
import SearchScreen from '../src/SearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function HomeScreenStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MailScreen');
                }}>
                <Ionicons name="mail" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchScreen')}>
                <TextInput
                  onPressIn={() => {
                    alert('123');
                  }}
                  style={{ width: 200, marginLeft: 10 }}
                  placeholder="Nhập tên sản phẩm cần tìm"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('QRScreen');
                }}>
                <Ionicons
                  style={{ marginRight: 15 }}
                  name="ios-qr-code-sharp"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CartScreen');
                }}>
                <FontAwesome5 name="shopping-cart" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 170,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('QRScreen');
                }}>
                <Ionicons
                  style={{ marginRight: 15 }}
                  name="ios-qr-code-sharp"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CartScreen');
                }}>
                <FontAwesome5 name="shopping-cart" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
        name="DetailProduct"
        component={DetailProduct}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 30,
              }}>
              <Text style={{ fontWeight: 'bold' }}>THÔNG BÁO</Text>
            </View>
          ),
        }}
        name="MailScreen"
        component={MailScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 30,
              }}>
              <Text style={{ fontWeight: 'bold' }}>QR Code</Text>
            </View>
          ),
        }}
        name="QRScreen"
        component={QRScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 30,
              }}>
              <Text style={{ fontWeight: 'bold' }}>CartScreen</Text>
            </View>
          ),
        }}
        name="CartScreen"
        component={CartScreen}
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
        options={{ title: 'Tìm kiếm sản phẩm' }}
        name="SearchScreen"
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
}
