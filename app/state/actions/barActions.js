'use strict'

import Bars from '../actionTypes/barActionTypes';
import Api from '../../api/Api';
import { ListView } from 'react-native';

const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2,sectionHeaderHasChanged: (s1,s2) => s1 !== s2});

const constructDataBlob = (array) => {
  let blob = {};
  for (var i = 0; i < array.length; i++) {
    let firstLetter = array[i].title.charAt(0);
    if (blob.hasOwnProperty(firstLetter)) {
      blob[firstLetter].push(array[i])
    } else {
      blob[firstLetter] = [array[i]]
    }
  }
  return ds.cloneWithRowsAndSections(blob)
}

const requestPending = () => {
  return {type: Bars.BAR_REQUEST_PENDING }
}

const requestError = () => {
  return {type: Bars.BAR_REQUEST_ERROR}
}

const allBarsFulfilled = (barsArray) => {
  return {type: Bars.BAR_REQUEST_FULFILLED, payload: constructDataBlob(barsArray) }
}

export const getBars = (attempt) => {
  let requestNumber = (attempt) ? attempt + 1:1;
  return (dispatch) => {
    // dispatch pending request on first attempt
    if (requestNumber === 1) {
      dispatch(requestPending())
    }

    fetch(Api.getBars, {method:'get',headers:Api.headers} )
    .then((res) => Api.checkStatus(res))
    .then((res) => dispatch(allBarsFulfilled(res.response)))
    .catch((e) => { console.log(e);
      // try again if error in case of server hiccup
      if (requestNumber < 3) {
        dispatch(getBars(requestNumber))
      } else {
        dispatch(requestError())
      }
    })
  }
}
