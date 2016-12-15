'use strict'

export default actionTypes([
  'GET_CARDS',
  'CARD_REQUEST_PENDING',
  'CARD_REQUEST_FULFILLED',
  'CARD_REQUEST_ERROR',
  'CHANGE_CARD_INDEX',
]);

function actionTypes(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
