'use strict'

import Cards from '../actionTypes/cardActionTypes';

const defaultState = {
  requestPending: false,
  requestError: false,
  dataSource: false,
  errorMessage: null,
  cards: false,
  index:0
}

const cardsReducer = (state=defaultState,action) => {
  switch (action.type) {
    case Cards.CARD_REQUEST_PENDING:
      return { ...defaultState, requestPending:true }
      break;

    case Cards.CARD_REQUEST_ERROR:
      return { ...state,
        requestError:true,
        requestPending: defaultState.requestPending,
        errorMessage: 'Server error...  Try again?'
       }
      break;

    case Cards.CARD_REQUEST_FULFILLED:
      return { ...state,
        requestPending: defaultState.requestPending,
        requestError: defaultState.requestError,
        errorMessage: defaultState.errorMessage,
        cards: action.payload
      }
      break;

  }
  return state
}

export default cardsReducer;