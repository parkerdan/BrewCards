'use strict'

import Nav from './actionTypes';

export const pushRoute = (route) => {
  return {type:Nav.PUSH_ROUTE,payload:route}
}

export const popRoute = () => {
  return {type:Nav.POP_ROUTE}
}

export const resetStack = (routeStack) => {
  return {type:Nav.RESET_STACK,payload:routeStack}
}
