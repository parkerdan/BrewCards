'use strict'

// React
import React from 'react';
import { View, InteractionManager } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { getCards, changeCardIndex } from '../../state/actions/cardActions';
import { pushRoute, popRoute } from '../../state/actions/navActions';

// Style
import { spinner, loading  } from '../../styles/loading';
import { header, headerHeight, headerColor, recipeIcon, closeIcon } from '../../styles/header';

// Views
import LoadingView from 'rn-loading-view';
import Header from 'rn-header';
import CardSwiper from '../../components/CardSwiper';
import CardScroller from '../../components/CardScroller';

// Routes
import { Recipe } from '../../state/navigation/routes';


const mapStateToProps = (state) => {
  return {
    settings:state.settings,
    cards: state.cards,
   }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushRoute: (route) => dispatch(pushRoute(route)),
    popRoute: () => dispatch(popRoute()),
    getCards: (barId) => dispatch(getCards(barId)),
    changeCardIndex: (newIndex) => dispatch(changeCardIndex(newIndex))
  }
};


class BarDetail extends React.Component {

  constructor(){
    super();
    // I do not know of a rudux way to handle this.  Having InteractionManager change the state of the actual scene allows for better transitions... this is the only state outside of Redux...
    this.state = { interactionsRunning:true }
  };

  componentDidMount(){
    this.props.getCards(this.props.bar.id);
    InteractionManager.runAfterInteractions( () => this.setState({interactionsRunning:false}) )
  };

  onLeftPress = () => {
    this.props.popRoute()
  };

  addOpacity = (rgb) => {
    var result = rgb.replace(')', ', .3)').replace('rgb', 'rgba');
    return result
  };

  render(){
    return(
      <View style={loading.container}>
        { this.renderLoading() }
      </View>
    )
  };

  renderLoading(){
    if (  this.state.interactionsRunning || !this.props.cards ) {
      let { requestError, errorMessage } = this.props.cards;
      return(
        <LoadingView
          text={ 'Getting information...' }
          textProps={{ style: loading.text }}
          renderButton={ requestError }
          spinnerProps={ spinner }
          buttonText={ errorMessage }
          buttonTextProps={{ style: loading.buttonText }}
          buttonProps={{
            style: loading.button,
            onPress: () => this.props.getCards(this.props.bar.id)
          }}
        />
      )
    } else {
      let { cards, index } = this.props.cards;
      return(
        <View style={{flex:1}}>
          <Header
            backgroundColor={ headerColor }
            height={ headerHeight }

            leftIconProps={ closeIcon }
            onLeftPress={ this.onLeftPress }

            rightIconProps={ (cards[index].recipe) ?  recipeIcon:false }
            onRightPress={
              () => this.props.pushRoute({...Recipe,recipe:cards[index].recipe, title:cards[index].title  })
            }

            centerText={ this.props.bar.title }
            centerTextProps={{
              style:header.centerText,
              numberOfLines:1
            }}
          />
          {this.renderUserOption()}

        </View>
      )
    }
  };

  renderUserOption(){
    let { cards,index } = this.props.cards;

    if (this.props.settings.showSwiper) {
      return(
        <CardSwiper
          addOpacity={ this.addOpacity }
          changeIndex={ (newIndex) => this.props.changeCardIndex(newIndex) }
          cards={ cards }
          index={ index }
        />
      )
    } else {
      return(
         <CardScroller
           cards={ cards }
           addOpacity={ this.addOpacity }
           changeIndex={ (newIndex) => this.props.changeCardIndex(newIndex) }
         />
      )
    }
  };


};

export default connect(mapStateToProps,mapDispatchToProps)(BarDetail)
