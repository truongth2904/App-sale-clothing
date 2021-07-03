import React, { useEffect, useState, useContext } from 'react';
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

import { getAllProduct, addProductInCart } from '../FirebaseConnect';
import UserContext from '../contexts/UserContext.js';

export default function HomeScreen({ navigation }) {
  const { user } = useContext(UserContext);

  const [data, setData] = useState([]);

  const getProductAsync = async () => {
    const products = await getAllProduct();
    setData(products);
  };
  getProductAsync();

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 3,
        }}>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          renderItem={({ item }) => (
            <ItemRender
              navigation={navigation}
              style={styles.item}
              item={item}
            />
          )}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
}

var ItemRender = ({ item, navigation }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailProduct', { item });
        }}>
        <Image
          style={{ width: 150, height: 205 }}
          source={{ uri: item.image }}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: 'red' }}>
            {parseFloat(parseInt(item.price))
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            VND
          </Text>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 1,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 10,
  },
});
