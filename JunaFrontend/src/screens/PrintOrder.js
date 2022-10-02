import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

const PrintOrder = (props) => {

  const {navigation} = props;
  const order_number = navigation.getParam('room_id');
  const table_number = navigation.getParam('table_number');

  const printOrder = () => {
    console.log('print');
    navigation.navigate('FoodList');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.upperContainer}>
        <Text style={styles.title}>Thank you for ordering at Juna Restaurant</Text>
        <Text style={styles.subtitle}>
          Order Number: #{order_number}
        </Text>
        <Text style={styles.subtitle}>
          Table Number: #{table_number}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => printOrder()}
          title="Print Order"
          color="#c53c3c"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
  },
})

export default PrintOrder;