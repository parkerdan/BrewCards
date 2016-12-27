'use strict'

import Settings from './actionTypes';
import Api from '../api/Api';

import { Platform, Alert, Linking } from 'react-native';

export const showScroll = () => {
  return {type: Settings.SHOW_SCROLL }
}

export const showSwiper = () => {
  return {type: Settings.SHOW_SWIPER}
}

const getUpdate = () => {
  Linking.openURL(Api.sendToAppStore)
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

const appVersionToInt = (stringVersion) => {
  // will strip the . off app versioning to check for a greater version.
  // must use strict naming conventions with this method as 1.0.18 is greater than 2.0 onve this regex is run...  This method will work well on both platform since android releases always hit before iOS and Android does not provide an API to query versioning and I do not want to build it into my backend yet...
  return parseInt(stringVersion.replace(/[.]/g,''))
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
          if (appVersionToInt(getState().settings.appVersion) < appVersionToInt(res.results[0].version)) {
            // prompt
            promtUpdate(res.results[0].version)
          }
        }
      })
      .catch((e) => {})
    }
  }
}
