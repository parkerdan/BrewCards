'use strict'

import Settings from '../actionTypes/settingsActionTypes';

const defaultState = {
  showSwiper:true
}

const settingsReducer = (state=defaultState,action) => {
  switch (action.type) {
    case Settings.SHOW_SWIPER:
      return { ...state,showSwiper:true}
      break;

    case Settings.SHOW_SCROLL:
      return { ...state,showSwiper:false}
      break;

  }
  return state
}

export default settingsReducer;
