'use strict'

// redux stuffs
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// reducers
import bars from './bars/reducer';
import settings from './settings/reducer';
import navigator from './navigation/reducer';
import cards from './cards/reducer';

const middleware = () => {
  // if (__DEV__) {
  //   return applyMiddleware(thunk,logger())
  // } else {
    return applyMiddleware(thunk)
  // }
}


export default createStore(
  combineReducers({
    bars: bars,
    settings: settings,
    navigator: navigator,
    cards: cards
  }),
  middleware(),
);
