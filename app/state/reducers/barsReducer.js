'use strict'

import Bars from '../actionTypes/barActionTypes';

const defaultState = {
  requestPending: false,
  requestError: false,
  dataSource: false,
  errorMessage: null,
}

const barReducer = (state=defaultState,action) => {
  switch (action.type) {
    case Bars.REQUEST_PENDING:
      return { ...state,
        requestPending:true,
        requestError: defaultState.requestError,
        errorMessage: defaultState.errorMessage
       }
      break;

    case Bars.REQUEST_ERROR:
      return { ...state,
        requestError:true,
        requestPending: defaultState.requestPending,
        errorMessage: 'Server error...  Try again?'
       }
      break;

    case Bars.REQUEST_FULFILLED:
      return { ...state,
        dataSource: action.payload,
        requestPending: defaultState.requestPending,
        requestError: defaultState.requestError,
        errorMessage: defaultState.errorMessage
      }
      break;

  }
  return state
}

export default barReducer;
