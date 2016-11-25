'use strict'
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './app/state/store';
import NavContainer from './app/state/navigation/NavContainer';


export default class BrewCards extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <NavContainer />
      </Provider>
    )
  }
}


AppRegistry.registerComponent('BrewCards', () => BrewCards);
