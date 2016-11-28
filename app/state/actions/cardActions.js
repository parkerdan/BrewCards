'use strict'

import Cards from '../actionTypes/cardActionTypes';
import Api from '../../api/Api';

const requestPending = () => {
  return {type: Cards.CARD_REQUEST_PENDING }
}

const requestError = () => {
  return {type: Cards.CARD_REQUEST_ERROR}
}

const cardsFulfilled = (res) => {
  return {type:Cards.CARD_REQUEST_FULFILLED, payload: res }
}

export const changeCardIndex = (newIndex) => {
  return {type:Cards.CHANGE_CARD_INDEX, payload: newIndex}
}

export const getCards = (barId,attempt) => {
  let requestNumber = (attempt) ? attempt + 1:1;
  return (dispatch) => {
    // dispatch pending request on first attempt
    if (requestNumber === 1) {
      dispatch(requestPending())
    }

    fetch(Api.getCards, {method:'get',headers: {...Api.headers,'Bar-Id':barId} } )
    .then((res) => Api.checkStatus(res))
    .then((res) => {
      // check for proper response, and having content length or else dispatch an error
      if (res.response && res.response.length > 0) {
        dispatch(cardsFulfilled(res.response))
      } else {
        dispatch(requestError())
      }
    })
    .catch((e) => {
      // try again if error in case of server hiccup or dispatch an error
      if (requestNumber < 3) {
        dispatch(getCards(barId,requestNumber))
      } else {
        dispatch(requestError())
      }
    })
  }
}
