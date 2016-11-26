'use strict';

import React from 'react';
import { NavigationExperimental, BackAndroid, AsyncStorage } from 'react-native';
import renderScene from './renderScene';

const { CardStack: NavigationCardStack } = NavigationExperimental;

export default class Navigator extends React.Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction);
    AsyncStorage.getItem('settings')
    .then((res) => {
      if (res) {
         (JSON.parse(res).showSwiper) ? this.props.showSwiper():this.props.showScroll();
      }
    }).done()
  };

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction);
  };

  handleBackAction = () => {
    if (this.props.nav.index === 0) {
      return false;
    }
    this.props.popRoute();
    return true;
  };

  handleNavigate = (action) => {
    switch (action && action.type) {
    case 'push':
      this.props.pushRoute(action.payload);
      return true;
    case 'back':
    case 'pop':
      return this.handleBackAction();
    default:
      return false;
    }
  };

  render() {
    return (
      <NavigationCardStack
        direction={'horizontal'}
        navigationState={this.props.nav}
        onNavigate={this.handleNavigate}
        renderScene={ renderScene }
        enableGestures={false}
      />
    );
  }
}
