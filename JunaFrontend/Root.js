import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import FoodList from './src/screens/FoodList';
import FoodDetails from './src/screens/FoodDetails';
import OrderSummary from './src/screens/OrderSummary';
import PrintOrder from './src/screens/PrintOrder';

const RootStack = createStackNavigator(
  {
    FoodList,
    FoodDetails,
    OrderSummary,
    PrintOrder,
  },
  {
    initialRouteName: 'FoodList',
  },
);

const AppContainer = createAppContainer(RootStack);

class Root extends Component {
  render() {
    return <AppContainer />;
  }
}

export default Root;