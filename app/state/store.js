'use strict'
// redux stuffs
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// reducers
import barsReducer from './reducers/barsReducer';
import settingsReducer from './reducers/settingsReducer';
import navReducer from './reducers/navReducer';
import cardsReducer from './reducers/cardsReducer';

const middleware = () => {
  // if (__DEV__) {
  //   return applyMiddleware(thunk,logger())
  // } else {
    return applyMiddleware(thunk)
  // }
}


export default createStore(
  combineReducers({
    bars: barsReducer,
    settings:settingsReducer,
    nav: navReducer,
    cards: cardsReducer
  }),
  middleware(),
);
