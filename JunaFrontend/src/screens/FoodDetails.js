import React, {Component} from 'react';
import {View, Button, Alert} from 'react-native';

import NavHeader from '../components/NavHeader';
import PageCard from '../components/PageCard';

import {AppContext} from '../../GlobalContext';

class FoodDetails extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('item').name.substr(0, 12) + '...',
      headerRight: () => (
        <NavHeader toScreen={'OrderSummary'} buttonText={'View Basket'} />
      ),
    };
  };

  static contextType = AppContext;

  state = {
    qty: 1,
  };

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.item = navigation.getParam('item');
  }

  qtyChanged = value => {
    const nextValue = Number(value);
    this.setState({qty: nextValue});
  };

  addToCart = (item, qty) => {
      Alert.alert(
        'Added to basket',
        `${qty} ${item.name} was added to the basket.`,
      );
      this.context.addToCart(item, qty);
  };

  render() {
    const {qty} = this.state;
    return (
      <PageCard
        item={this.item}
        qty={qty}
        qtyChanged={this.qtyChanged}
        addToCart={this.addToCart}
      />
    );
  }
}

export default FoodDetails;