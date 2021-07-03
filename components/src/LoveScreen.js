import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailProduct from './DetailProduct';
const Stack = createStackNavigator();

import { getProductInLove, addLoveProductInUser } from '../FirebaseConnect';
import UserContext from '../contexts/UserContext.js';

export default function LoveScreen({ navigation }) {
  const { user } = React.useContext(UserContext);
  const [data, setData] = React.useState([]);

  const getProductInLoveAsync = async () => {
    const products = await getProductInLove(user);
    setData(products);
  };

  React.useEffect(() => {
    getProductInLoveAsync();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => (
          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
            {item.product_id}
          </Text>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
