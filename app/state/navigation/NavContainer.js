'use strict';

import { connect } from 'react-redux';
import Navigator from './Navigator';
import { pushRoute, popRoute } from '../actions/navActions';

const mapStateToProps = (state) => {
  return {
    nav: state.nav
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushRoute: (route) => dispatch(pushRoute(route)),
    popRoute: () => dispatch(popRoute()),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Navigator);
