import React, { useState, useEffect, useContext } from 'react';
import base64 from 'react-native-base64';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProduct, getAllUser, addUser } from '../FirebaseConnect';
import UserContext from '../contexts/UserContext.js';

export default function App({ navigation }) {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hideLogin, setHideLogin] = useState(true);
  const [hideSignUp, setHideSignUp] = useState(false);

  const [usernameRegetor, setUsernameRegetor] = useState('');
  const [passwordRegetor, setPasswordRegetor] = useState('');
  const [rePasswordRegetor, setRePasswordRegetor] = useState('');
  const [nameRegetor, setNameRegetor] = useState('');

  const { setUser } = useContext(UserContext);

  const onHandleLogin = async () => {
    let index = users.findIndex((o) => o.username === username);

    if (index != -1) {
      if (
        (users[index].username == username) ==
        (base64.decode(users[index].password) == password)
      ) {
        const user = users[index];
        await AsyncStorage.setItem('@storage_username', JSON.stringify(user));
        setUser(user);

        navigation.navigate('UserScreen');
        navigation.navigate('HomeScreen');
      }
    } else { 
      alert('Sai tài khoản hoặc mật khẩu !');
    }
  };
  const onHandleRegetor = () => {
    if (
      usernameRegetor === '' ||
      passwordRegetor === '' ||
      rePasswordRegetor === '' ||
      nameRegetor === ''
    ) { 
      alert('Yêu cầu nhập thông tin !');
      return;
    }

    if (checkUsernameVN(usernameRegetor).trim() != usernameRegetor) {
      alert('Vui lòng không đặt khoảng trắng và không sử dụng dấu !');
      return;
    }
    if (passwordRegetor !== rePasswordRegetor) {
      alert('Mật khẩu nhập lại không chính xác !');
    } else {
      let index = users.findIndex((o) => o.username === usernameRegetor);
      if (index == -1) {
        let user = {
          username: usernameRegetor,
          password: passwordRegetor,
          name: nameRegetor,
          image: '',
          description: '',
          power: 0,
        };
        addUser(user);
        alert('Tạo tài khoản thành công !');
        getUserAsync();
      } else {
        alert('Tên đăng nhập đã tồn tại !');
      }
    }
  };
  //loại bỏ dấu tiếng việt
  const checkUsernameVN = (str) => {
    var AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ',
      'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ',
    ];
    let strr = str;
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      strr = strr.replace(re, char);
    }
    return strr;
  };
  const getUserAsync = async () => {
    const users = await getAllUser();
    setUsers(users);
  };
  useEffect(() => {
    getUserAsync();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          style={{ width: 120, height: 90, marginLeft: 20 }}
          source={{
            uri:
              'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/81b454dfb93abe741b2755a8dab25bb8',
          }}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              setHideLogin(true);
              setHideSignUp(false);
            }}
            style={{
              width: 80,
              height: 30,
              backgroundColor: '#33FF33',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setHideLogin(false);
              setHideSignUp(true);
            }}
            style={{
              width: 80,
              height: 30,
              backgroundColor: '#33CC00',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        {hideLogin && (
          <View>
            <View
              style={{
                backgroundColor: '#669900',
                width: 270,
                height: 150,
                marginTop: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', height: 45, margin: 5 }}>
                <FontAwesome
                  style={{ height: 50, margin: 10 }}
                  name="user-circle"
                  size={30}
                  color="black"
                />
                <TextInput
                  onChangeText={(value) => setUsername(value)}
                  style={styles.textinput}
                  value={username}
                  placeholder="Tên đăng nhập"
                />
              </View>
              <View style={{ flexDirection: 'row', height: 45, margin: 5 }}>
                <Entypo
                  style={{ height: 50, margin: 10 }}
                  name="lock-open"
                  size={30}
                  color="black"
                />
                <TextInput
                  secureTextEntry={true}
                  onChangeText={(value) => setPassword(value)}
                  style={styles.textinput}
                  value={password}
                  placeholder="Mật khẩu"
                />
              </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={onHandleLogin}
                style={{
                  width: 200,
                  height: 50,
                  backgroundColor: '#009900',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 30,
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {hideSignUp && (
          <View>
            <View
              style={{
                backgroundColor: '#669900',
                width: 270,
                height: 240,
                marginTop: 8,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', height: 45, margin: 5 }}>
                <FontAwesome
                  style={{ height: 50, margin: 10 }}
                  name="user-circle"
                  size={30}
                  color="black"
                />
                <TextInput
                  style={styles.textinput}
                  value={usernameRegetor}
                  placeholder="Tên đăng nhập"
                  onChangeText={(value) => setUsernameRegetor(value)}
                />
              </View>
              <View style={{ flexDirection: 'row', height: 45, margin: 5 }}>
                <Entypo
                  style={{ height: 50, margin: 10 }}
                  name="lock-open"
                  size={30}
                  color="black"
                />
                <TextInput
                  secureTextEntry={true}
                  style={styles.textinput}
                  value={passwordRegetor}
                  placeholder="Mật khẩu"
                  onChangeText={(value) => {
                    setPasswordRegetor(value);
                    console.log(passwordRegetor);
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', height: 45, margin: 5 }}>
                <Entypo
                  style={{ height: 50, margin: 10 }}
                  name="lock-open"
                  size={30}
                  color="black"
                />
                <TextInput
                  style={styles.textinput}
                  value={rePasswordRegetor}
                  placeholder="Nhập lại mật khẩu"
                  onChangeText={(value) => setRePasswordRegetor(value)}
                  secureTextEntry={true}
                />
              </View>
              <View style={{ flexDirection: 'row', height: 45, margin: 5 }}>
                <AntDesign
                  style={{ height: 50, margin: 10 }}
                  name="meh"
                  size={24}
                  color="black"
                />
                <TextInput
                  style={styles.textinput}
                  value={nameRegetor}
                  placeholder="Họ và Tên"
                  onChangeText={(value) => setNameRegetor(value)}
                />
              </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  onHandleRegetor();
                }}
                style={{
                  width: 250,
                  height: 30,
                  backgroundColor: '#009900',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 5,
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderRadius: 5,
    backgroundColor: 'white',
    height: 35,
  },
});
