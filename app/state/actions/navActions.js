'use strict'

import Nav from '../actionTypes/navActionTypes';

export const pushRoute = (route) => {
  return {type:Nav.PUSH_ROUTE,payload:route}
}

export const popRoute = () => {
  return {type:Nav.POP_ROUTE}
}
