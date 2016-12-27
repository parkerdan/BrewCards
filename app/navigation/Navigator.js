'use strict';

// React
import React from 'react';
import { NavigationExperimental, BackAndroid, AsyncStorage, Linking, Alert } from 'react-native';
const { CardStack: NavigationCardStack } = NavigationExperimental;

// Redux
import { connect } from 'react-redux';

// Functions
import renderScene from './renderScene';
import SplashScreen from 'react-native-smart-splash-screen';
import { pushRoute, popRoute, resetStack } from './actions';
import { showSwiper, showScroll, checkAppVersion } from '../settings/actions';

// Routes
import { BarsMain, BarDetail } from './routes';


const mapStateToProps = (state) => {
  return {
    navigator: state.navigator
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushRoute: (route) => dispatch(pushRoute(route)),
    popRoute: () => dispatch(popRoute()),
    resetStack: (routeStack) => dispatch(resetStack(routeStack)),

    showSwiper: () => dispatch(showSwiper()),
    showScroll: () => dispatch(showScroll()),

    checkAppVersion: () => dispatch(checkAppVersion()),
  };
};


class Navigator extends React.Component {

  componentDidMount() {

    Linking.getInitialURL()
    .then((url) => {
      if (url) {
        // this handles the case where hte app is closed and is launched via deep linking.
        // Alert.alert('GET INIT URL','initial url  ' + url)
        this.resetStackToProperRoute(url)
      }
    })
    .catch((e) => {})

    Linking.addEventListener('url', this._handleOpenURL);
    SplashScreen.close("scale", 500, 500);
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction);
    AsyncStorage.getItem('settings')
    .then((res) => {
      if (res) {
         (JSON.parse(res).showSwiper) ? this.props.showSwiper():this.props.showScroll();
      }
    }).done();
    this.props.checkAppVersion()
  };

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction);
  };

  _handleOpenURL = (event) => {
    // this handles the use case where the app is running in the background and is activated by universal linking...
    this.resetStackToProperRoute(event.url)
  }

  resetStackToProperRoute = (url) => {
    let trailing = url.slice(url.lastIndexOf('/') + 1,url.length)
    this.props.resetStack([ BarsMain, { ...BarDetail, id:parseInt(trailing) } ])
  }

  handleBackAction = () => {
    if (this.props.navigator.index === 0) {
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
        navigationState={this.props.navigator}
        onNavigate={this.handleNavigate}
        renderScene={ renderScene }
        enableGestures={false}
      />
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigator);
