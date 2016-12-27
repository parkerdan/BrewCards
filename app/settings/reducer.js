'use strict'

import Settings from './actionTypes';
import { AsyncStorage } from 'react-native';


const defaultState = {
  showSwiper:true,
  appVersion: '1.5',
}

const reducer = (state=defaultState,action) => {
  switch (action.type) {
    case Settings.SHOW_SWIPER:
      var newState = { ...state,showSwiper:true}
      AsyncStorage.setItem('settings',JSON.stringify(newState));
      return newState
      break;

    case Settings.SHOW_SCROLL:
      var newState = { ...state,showSwiper:false}
      AsyncStorage.setItem('settings',JSON.stringify(newState));
      return newState
      break;

  }
  return state
}

export default reducer;
