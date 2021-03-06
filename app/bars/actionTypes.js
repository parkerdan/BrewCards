'use strict'

export default actionTypes([
  'GET_BARS',
  'BAR_REQUEST_PENDING',
  'BAR_REQUEST_FULFILLED',
  'BAR_REQUEST_ERROR',
]);

function actionTypes(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
