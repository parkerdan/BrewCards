'use strict'

export default actionTypes([
  'SHOW_SWIPER',
  'SHOW_SCROLL',
]);

function actionTypes(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
