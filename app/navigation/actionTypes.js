'use strict'

export default actionTypes([
  'PUSH_ROUTE',
  'POP_ROUTE',
  'RESET_STACK'
]);

function actionTypes(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
