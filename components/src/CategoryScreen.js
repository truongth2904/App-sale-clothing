import * as React from 'react';
import {
  StyleSheet,
  Button,
  ToastAndroid,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default function App() {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity style={styles.buttonCategory}>
          <Text>Nam</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCategory}>
          <Text>Nữ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCategory}>
          <Text>Trẻ em</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonCategory: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 30,
    marginLeft: 30,
  },
});
