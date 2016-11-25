'use strict'

export default barActionTypes([
  'GET_ALL_BARS',
  'GET_BAR_DETAILS',
  'REQUEST_PENDING',
  'REQUEST_FULFILLED',
  'REQUEST_ERROR'
]);

function barActionTypes(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
