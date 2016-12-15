'use strict'

import Nav from './actionTypes';
import { BarsMain } from './routes';
import { NavigationExperimental } from 'react-native';

const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental

const defaultState = {
  index: 0,
  key: 'root',
  routes: [ BarsMain ]
}

const reducer = (state=defaultState,action) => {

  switch (action.type) {
    case Nav.PUSH_ROUTE:
      return NavigationStateUtils.push(state, action.payload)
      break;

    case Nav.POP_ROUTE:
      return NavigationStateUtils.pop(state)
      break;

    case Nav.RESET_STACK:
      let routeIndex = action.payload.length - 1
      return NavigationStateUtils.reset({ ...state}, action.payload, routeIndex)
      break;

  }
  return state
}

export default reducer;
