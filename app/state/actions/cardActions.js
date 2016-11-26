'use strict'

import Cards from '../actionTypes/cardActionTypes';
import Api from '../../api/Api';
import { ListView } from 'react-native';

// const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2,sectionHeaderHasChanged: (s1,s2) => s1 !== s2});
//
//
//
// const constructDataBlob = (array) => {
//   let blob = {};
//   for (var i = 0; i < array.length; i++) {
//     let firstLetter = array[i].title.charAt(0);
//     if (blob.hasOwnProperty(firstLetter)) {
//       blob[firstLetter].push(array[i])
//     } else {
//       blob[firstLetter] = [array[i]]
//     }
//   }
//   return ds.cloneWithRowsAndSections(blob)
// }

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
    .then((res) => dispatch(cardsFulfilled(res.response)))
    .catch((e) => {
      // try again if error in case of server hiccup
      if (requestNumber < 3) {
        dispatch(getCards(barId,requestNumber))
      } else {
        dispatch(requestError())
      }
    })
  }
}
