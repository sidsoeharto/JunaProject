import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';

const ListCard = ({item, viewItem}) => {
  const BASE_URL = 'http://10.0.2.2:3000';
  return (
    <TouchableOpacity
      onPress={() => {
        viewItem(item);
      }}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{uri: `${BASE_URL}/images/${item.image}`}}
          />
        </View>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  //
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#303540',
  },
});

export default ListCard;