import React from 'react';
export const AppContext = React.createContext({});

export class AppContextProvider extends React.Component {
  state = {
    cart_items: [],
    user_id: 'sidsoeharto',
    user_name: 'Sidiq Soeharto',
    user_type: 'customer',
    table_number: '',
    room_name: '',
  };

  constructor(props) {
    super(props);
  }

  setTable = (id, order_name) => {
    this.setState({
      table_number: id,
      room_name: order_name,
    });
  };

  addToCart = (item, qty) => {
    let found = this.state.cart_items.filter(el => el.id === item.id);
    if (found.length == 0) {
      this.setState(prevState => {
        return {cart_items: prevState.cart_items.concat({...item, qty})};
      });
    } else {
      this.setState(prevState => {
        const other_items = prevState.cart_items.filter(
          el => el.id !== item.id,
        );
        return {
          cart_items: [...other_items, {...found[0], qty: found[0].qty + qty}],
        };
      });
    }
  };

  updateCart = (item, qty) => {
    let found = this.state.cart_items.find(el => el.id === item.id);

    console.log(found);

    if (found && qty > 0) {
      this.setState(prevState => {
        const other_items = prevState.cart_items.filter(
          el => el.id !== item.id,
        );
        return {
          cart_items: [...other_items, {...found, qty: qty}],
        };
      });
    } else if (found && qty == 0) {
      this.setState(prevState => {
        const other_items = prevState.cart_items.filter(
          el => el.id !== item.id,
        );
        return {
          cart_items: [...other_items],
        };
      });
    }
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          updateCart: this.updateCart,
          setTable: this.setTable,
        }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
//

export const withAppContextProvider = ChildComponent => props => (
  <AppContextProvider>
    <ChildComponent {...props} />
  </AppContextProvider>
);