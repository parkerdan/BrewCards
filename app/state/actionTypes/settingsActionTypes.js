'use strict'

export default settingsActionTypes([
  'SHOW_SWIPER',
  'SHOW_SCROLL'
]);

function settingsActionTypes(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
