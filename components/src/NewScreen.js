import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function NewScreen() {
  return (
    <ScrollView style={{ alignItems: 'center' }}>
      <Image
        style={{ width: 260, height: 100, marginBottom: 30, marginTop: 20 }}
        source={{
          uri:
            'https://f38-zpg.zdn.vn/7579903608970452712/0149614c70df8581dcce.jpg',
        }}
      />
      <Image
        style={styles.img}
        source={{
          uri:
            'https://f37-zpg.zdn.vn/698619172089114469/a8650f7700e4f5baacf5.jpg',
        }}
      />
      <Image
        style={styles.img}
        source={{
          uri:
            'https://f38-zpg.zdn.vn/5757951576129242936/49cdc620c2b337ed6ea2.jpg',
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    marginBottom: 30,
    width: 260,
    height: 400,
  },
});
