'use strict'

export default navActionTypes([
  'PUSH_ROUTE',
  'POP_ROUTE'
]);

function navActionTypes(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
