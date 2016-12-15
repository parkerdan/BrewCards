'use strict'

import Bars from './actionTypes';

const defaultState = {
  requestPending: false,
  requestError: false,
  dataSource: false,
  errorMessage: null,
}

const reducer = (state=defaultState,action) => {
  switch (action.type) {
    case Bars.BAR_REQUEST_PENDING:
      return { ...defaultState, requestPending:true }
      break;

    case Bars.BAR_REQUEST_ERROR:
      return { ...state,
        requestError:true,
        requestPending: defaultState.requestPending,
        errorMessage: 'Server error...  Try again?'
       }
      break;

    case Bars.BAR_REQUEST_FULFILLED:
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

export default reducer;
