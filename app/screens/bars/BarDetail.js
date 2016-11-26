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
import { header, headerHeight, headerColor, recipeIcon, backIcon } from '../../styles/header';

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
  }

  onLeftPress = () => {
    this.props.popRoute()
  }

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
      return this.renderMainView()
    }
  };

  renderMainView(){
    let { cards,index } = this.props.cards;

    if (this.props.settings.showSwiper) {
      return(
        <View style={{flex:1}}>
          <Header
            backgroundColor={ cards[index].backgroundColor }
            height={ headerHeight }

            leftIconProps={{ ...backIcon, color:cards[index].textColor }}
            onLeftPress={ this.onLeftPress }

            centerText={ this.props.bar.title }
            centerTextProps={{
              style:[header.centerText,{color:cards[index].textColor  }],
              numberOfLines:1
            }}
          />

          <CardSwiper
            changeIndex={ (newIndex) => this.props.changeCardIndex(newIndex) }
            cards={ cards }
            index={ index }
          />
        </View>
      )
    } else {
      return(
        <CardScroller
          headerHeight={ headerHeight }
          centerText={ this.props.bar.title }
          centerTextStyle={ header.centerText }
          onLeftPress={ this.onLeftPress }
          leftIconProps={ backIcon }
          cards={ cards }
        />
      )
    }
  };


};

export default connect(mapStateToProps,mapDispatchToProps)(BarDetail)
