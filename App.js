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
 
import HomeScreen from './components/src/HomeScreen';
import CartScreen from './components/src/CartScreen';
import CategoryScreen from './components/src/CategoryScreen';
import LoveScreen from './components/src/LoveScreen';
import NewScreen from './components/src/NewScreen';
import UserScreen from './components/src/UserScreen';
import DetailProduct from './components/src/DetailProduct';
import MailScreen from './components/src/MailScreen';
import QRScreen from './components/src/QRScreen';

import HomeScreenStack from './components/StackScreen/HomeScreenStack';
import LoveScreenStack from './components/StackScreen/LoveScreenStack';
import UserScreenStack from './components/StackScreen/UserScreenStack';

import firebaseConnect from './components/FirebaseConnect';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from './components/contexts/UserContext';

export default function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const userStorage = await AsyncStorage.getItem('@storage_username');
      setUser(JSON.parse(userStorage));
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreenStack}
            options={{
              title: 'Mua sắm',
              tabBarIcon: () => (
                <FontAwesome name="home" size={24} color="black" />
              ),
            }}
          />
          <Tab.Screen
            options={{
              title: 'Danh mục',
              tabBarIcon: () => (
                <Fontisto name="world" size={24} color="black" />
              ),
            }}
            name="CategoryScreen"
            component={CategoryScreen}
          />
          <Tab.Screen
            options={{
              title: 'Mới',
              tabBarIcon: () => (
                <AntDesign name="staro" size={24} color="black" />
              ),
            }}
            name="NewScreen"
            component={NewScreen}
          />
          <Tab.Screen
            options={{
              title: 'Yêu thích',
              tabBarIcon: () => (
                <AntDesign name="heart" size={24} color="black" />
              ),
            }}
            name="LoveScreen"
            component={LoveScreenStack}
          />
          <Tab.Screen
            options={{
              title: 'Tôi',
              tabBarIcon: () => (
                <FontAwesome5 name="user-tie" size={24} color="black" />
              ),
            }}
            name="UserScreen"
            component={UserScreenStack}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
