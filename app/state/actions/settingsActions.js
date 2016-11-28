'use strict'

import Settings from '../actionTypes/settingsActionTypes';
import Api from '../../api/Api';

import { Platform, Alert, Linking } from 'react-native';

export const showScroll = () => {
  return {type: Settings.SHOW_SCROLL }
}

export const showSwiper = () => {
  return {type: Settings.SHOW_SWIPER}
}

const getUpdate = () => {
  Linking.openUrl(Api.sendToAppStore)
  .catch((e) => {
    Alert.alert('Unable to launch App Store','Go to App Store on your device to update',[
      {text:' OK '}
    ])
  })
}

const promtUpdate = (appVersion) => {
  Alert.alert('Update Available','BrewCards version ' + appVersion + ' available',[
    {text:'Get Now', onPress: getUpdate},{text:'No Thanks'}
  ])
}

export const checkAppVersion = () => {
  return (dispatch, getState) => {
    if (Platform.OS === 'ios') {
      fetch(Api.getIosVersion, {method:'get',headers:Api.headers} )
      .then((res) => Api.checkStatus(res))
      .then((res) => {
        // check the reply from itunes
        if (res && res.results && res.results[0] && res.results[0].version) {
          // check the version on file locally
          if (getState().settings.appVersion !== res.results[0].version) {
            // prompt
            promtUpdate(res.results[0].version)
          }
        }
      })
      .catch((e) => {})
    }
  }
}
