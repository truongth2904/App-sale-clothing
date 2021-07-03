import * as React from 'react';
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
import LoveScreen from '../src/LoveScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function LoveScreenStack({ navigation }) {
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
              <Text
                style={{ fontWeight: 'bold', marginLeft: 75, marginRight: 25 }}>
                Danh sách yêu thích
              </Text>
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
        name="LoveScreen"
        component={LoveScreen}
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
    </Stack.Navigator>
  );
}
