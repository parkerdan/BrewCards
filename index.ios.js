'use strict'

// React
import React from 'react';
import { AppRegistry } from 'react-native';

// Redux
import { Provider } from 'react-redux';
import store from './app/store';

// Navigator
import Navigator from './app/navigation/Navigator';


class BrewCards extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}


AppRegistry.registerComponent('BrewCards', () => BrewCards);
