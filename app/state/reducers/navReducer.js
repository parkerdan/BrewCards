'use strict'

import Nav from '../actionTypes/navActionTypes';
import { BarsMain } from '../navigation/routes';
import { NavigationExperimental } from 'react-native';

const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental

const defaultState = {
  index: 0,
  key: 'root',
  routes: [ BarsMain ]
}

const navReducer = (state=defaultState,action) => {

  switch (action.type) {
    case Nav.PUSH_ROUTE:
      return NavigationStateUtils.push(state, action.payload)
      break;

    case Nav.POP_ROUTE:
      return NavigationStateUtils.pop(state)
      break;

  }
  return state
}

export default navReducer;
