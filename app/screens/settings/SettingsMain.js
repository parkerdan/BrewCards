'use strict'

// React
import React from 'react';
import { View, Text, TouchableOpacity, InteractionManager } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { showSwiper, showScroll } from '../../state/actions/settingsActions';
import { popRoute } from '../../state/actions/navActions';

// Style
import { spinner, loading  } from '../../styles/loading';
import { header, headerHeight, headerColor, backIcon } from '../../styles/header';
import { settings, checkIcon } from '../../styles/settings';

// Views
import Header from 'rn-header';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingView from 'rn-loading-view';
import Footer from '../../components/Footer';


const mapStateToProps = (state) => {
  return {settings:state.settings}
};

const mapDispatchToProps = (dispatch) => {
  return {
    popRoute: () => dispatch(popRoute()),
    showSwiper: () => dispatch(showSwiper()),
    showScroll: () => dispatch(showScroll())
  }
};



class SettingsMain extends React.Component {

  constructor(){
    super();
    // I do not know of a rudux way to handle this.  Having InteractionManager change the state of the actual scene allows for better transitions... this is the only state outside of Redux...
    this.state = { interactionsRunning: true }
  };

  componentDidMount(){
    InteractionManager.runAfterInteractions( () => this.setState({interactionsRunning:false}) );
  };

  render(){
    return(
      <View style={ loading.container }>
        <Header
          backgroundColor={ headerColor }
          height={ headerHeight }
          centerText={ 'Settings' }
          centerTextProps={{ style:header.centerText }}
          leftIconProps={ backIcon }
          onLeftPress={ () => this.props.popRoute() }
        />
        { this.renderLoading() }
        <Footer/>
      </View>
    )
  };

  renderLoading(){
    if (this.state.interactionsRunning) {
      return <LoadingView spinnerProps={ spinner }/>
    } else {
      return this.renderMainView()
    }
  };

  renderMainView(){
    return(
      <View style={{ flex:1 }}>
        <Text style={ settings.heading }>How would you like your cards presented?</Text>

        { this.renderOption( () => this.props.showSwiper(), 'Swiper!!  Swiper is great!', true ) }

        { this.renderOption( () => this.props.showScroll(), 'Scroll!! I like to scroll!', false ) }

      </View>
    )
  };

  renderOption(onPress, text, isSwiper){
    return(
      <TouchableOpacity
        onPress={ onPress }
        style={ settings.optionContainer }
      >
        <View style={ settings.textContainer }>
          <Text style={ settings.text }>{ text }</Text>
        </View>
        <View style={ settings.iconContainer }>
          { this.renderCheck(isSwiper) }
        </View>
      </TouchableOpacity>
    )
  };

  renderCheck(bool){
    if (this.props.settings.showSwiper === bool ) {
      return(
        <Icon {...checkIcon} />
      )
    }
  };

};

export default connect(mapStateToProps,mapDispatchToProps)(SettingsMain)
