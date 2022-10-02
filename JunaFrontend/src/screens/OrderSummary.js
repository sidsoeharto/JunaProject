import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

import {AppContext} from '../../GlobalContext';
import {SimpleStepper} from 'react-native-simple-stepper';

import getSubTotal from '../helpers/getSubTotal';

const random = require('string-random');
import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:3000';

class OrderSummary extends Component {
  static navigationOptions = {
    title: 'Order Summary',
  };

  static contextType = AppContext;

  state = {
    table_number: '',
  };

  render() {
    const subtotal = getSubTotal(this.context.cart_items);

    return (
      <View style={styles.wrapper}>
        {this.context.cart_items.length > 0 && (
          <View style={styles.upperContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>
                Table Number:
              </Text>
              <TextInput 
                style={styles.textInput}
                keyboardType={'numeric'}
                onChangeText={text =>
                  this.setState({table_number: text.replace(/[^0-9]/g, '')})
                }
                value={this.state.table_number}
              /> 
            </View>
          </View>
        )}

        <View style={styles.cartItemsContainer}>
          <FlatList
            data={this.context.cart_items}
            renderItem={this.renderCartItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.spacerBox} />

          {subtotal > 0 && (
            <View style={styles.paymentSummaryContainer}>
              <View style={styles.endLabelContainer}>
                <Text style={styles.priceLabel}>Subtotal</Text>
                <Text style={styles.priceLabel}>Tax</Text>
                <Text style={styles.priceLabel}>Total</Text>
              </View>

              <View>
                <Text style={styles.price}>${subtotal}</Text>
                <Text style={styles.price}>${0.11 * subtotal}</Text>
                <Text style={styles.price}>${subtotal + (0.11 * subtotal)}</Text>
              </View>
            </View>
          )}
        </View>

        {subtotal == 0 && (
          <View style={styles.messageBox}>
            <Text style={styles.messageBoxText}>Your cart is empty</Text>
          </View>
        )}

        {subtotal > 0 && (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this.placeOrder()}
              title="Place Order"
              color="#c53c3c"
            />
          </View>
        )}
      </View>
    );
  }
  //

  placeOrder = async () => {
    const room_id = random();
    const room_name = `Order ${room_id} #${this.state.table_number}`;

    this.context.setTable(this.state.table_number, room_name);

    try {
      await axios.post(`${BASE_URL}/order`, {
        room_id,
        room_name: room_name,
        table_number: this.state.table_number,
        items: this.context.cart_items
      });
    } catch (err) {
      console.log('err: ', err);
    }

    this.props.navigation.navigate('PrintOrder', {
      room_id,
      table_number: this.state.table_number,
    });
  };

  qtyChanged = (itm, value) => {
    const nextValue = Number(value);
    this.context.updateCart(itm, nextValue);
  };

  renderCartItem = ({item}) => {
    return (
      <View style={styles.cartItemContainer}>
        <View style={styles.itemDetail}>
          <SimpleStepper
            valueChanged={value => this.qtyChanged(item, value)}
            initialValue={item.qty}
            minimumValue={0}
            maximumValue={10}
            showText={true}
            containerStyle={styles.stepperContainer}
            incrementImageStyle={styles.stepperButton}
            decrementImageStyle={styles.stepperButton}
            textStyle={styles.stepperText}
          />
          <Text style={styles.priceLabel}>
            {item.name}
          </Text>
        </View>
        <View style={styles.itemDetail}>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    );
  };
}
//

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  upperContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  cartItemsContainer: {
    flex: 3,
    marginTop: 20,
  },
  lowerContainer: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
  },
  spacerBox: {
    flex: 2,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  paymentSummaryContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  endLabelContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: '#ccc',
    marginRight: 6,
  },
  stepperButton: {
    height: 14,
    width: 14,
  },
  stepperText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  priceLabel: {
    fontSize: 18,
  },
  messageBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4c90d4',
  },
  messageBoxText: {
    fontSize: 18,
    color: '#fff',
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'solid',
    borderRadius: 10,
    width: '100%',
    padding: 10,
  },
  formGroup: {
    padding: 20,
    flex: 3,
  },
  formLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  }
});

export default OrderSummary;