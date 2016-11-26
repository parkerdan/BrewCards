'use strict';

import { connect } from 'react-redux';
import Navigator from './Navigator';
import { pushRoute, popRoute } from '../actions/navActions';
import { showSwiper, showScroll } from '../actions/settingsActions';


const mapStateToProps = (state) => {
  return {
    nav: state.nav
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushRoute: (route) => dispatch(pushRoute(route)),
    popRoute: () => dispatch(popRoute()),
    showSwiper: () => dispatch(showSwiper()),
    showScroll: () => dispatch(showScroll())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Navigator);
