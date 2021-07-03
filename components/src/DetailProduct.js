import * as React from 'react';
import {
  StyleSheet,
  Button,
  ToastAndroid,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import UserContext from '../contexts/UserContext.js';
import {
  addProductInCart,
  addLoveProductInUser,
  getProductInLove,
  deleteLoveProductInUser,
} from '../FirebaseConnect';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function DetailProduct(props) {
  const { user } = React.useContext(UserContext);
  const { item } = props.route.params;
  const [listProductLove, setListProductLove] = React.useState([]);
  const [isIconLove, setIsIconLove] = React.useState(false);

  React.useEffect(() => {}, []);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Image
          style={{ width: 150, height: 200 }}
          source={{ uri: item.image }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text
            numberOfLines={10}
            style={{ fontWeight: 'bold', color: '#0033CC', width: 200 }}>
            {item.name}
          </Text>

          <Text style={{ marginTop: 10 }}>
            {parseFloat(parseInt(item.price))
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            VND
          </Text>

          {isIconLove ? <View></View> : <View></View>}

          <View style={{ marginTop: 50 }}>
            <Text>
              Mua ngay -->
              <TouchableOpacity
                onPress={() => {
                  if (!user) {
                    alert('Bạn chưa đăng nhập tài khoản !');
                  } else {
                    addProductInCart(user, item);
                  }
                }}>
                <FontAwesome name="cart-plus" size={24} color="black" />
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
      <View style={{ margin: 1 }}>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Giới thiệu</Text>
        <Text
          style={{
            height: 100,
            borderWidth: 3,
            borderColor: 'black',
            marginTop: 20,
          }}>
          {item.description}
        </Text>
      </View>
      <View style={{ margin: 1 }}>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Đánh giá</Text>
        <Text
          style={{
            height: 100,
            borderWidth: 3,
            borderColor: 'black',
            marginTop: 20,
          }}>
          Đánh giá sản phẩm
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
