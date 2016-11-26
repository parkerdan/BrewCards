'use strict'

export default cardActionTypes([
  'GET_CARDS',
  'CARD_REQUEST_PENDING',
  'CARD_REQUEST_FULFILLED',
  'CARD_REQUEST_ERROR',
]);

function cardActionTypes(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
