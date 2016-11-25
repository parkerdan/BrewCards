'use strict'

import Settings from '../actionTypes/settingsActionTypes';
import { AsyncStorage } from 'react-native';

export const showScroll = () => {
  return {type: Settings.SHOW_SCROLL }
}

export const showSwiper = () => {
  return {type: Settings.SHOW_SWIPER}
}
