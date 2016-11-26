'use strict'

// React
import React from 'react';
import { View, InteractionManager } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { getCards, doneViewingCards } from '../../state/actions/cardActions';
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    pushRoute: (route) => dispatch(pushRoute(route)),
    popRoute: () => dispatch(popRoute()),
    getCards: (barId) => dispatch(getCards(barId)),
  }
}


class BarDetail extends React.Component {

  constructor(){
    super();
    this.state = {
      index:0,
      interactionsRunning:true
    }
  }

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
      return(
        <LoadingView
          text={ 'Getting information...' }
          textProps={{ style: loading.text }}
          renderButton={ this.props.cards.requestError }
          buttonText={   this.props.cards.errorMessage }
          buttonTextProps={{ style: loading.buttonText }}
          buttonProps={{
            style: loading.button,
            onPress: () => this.props.getCards(this.props.bar.id)
          }}
          spinnerProps={ spinner }/>
      )
    } else {
      return this.renderMainView()
    }
  };

  renderMainView(){
    if (this.props.settings.showSwiper) {
      return(
        <View style={{flex:1}}>
          <Header
            backgroundColor={ this.props.cards.cards[this.state.index].backgroundColor }
            height={ headerHeight }
            centerText={ this.props.bar.title }
            centerTextProps={ {style:[header.centerText,{color:this.props.cards.cards[this.state.index].textColor  }],numberOfLines:1} }
            leftIconProps={ {...backIcon,color:this.props.cards.cards[this.state.index].textColor} }
            onLeftPress={ this.onLeftPress }
          />

          <CardSwiper
            changeIndex={ (index) => this.setState({index:index}) }
            cards={this.props.cards.cards} index={this.state.index} />
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
          cards={this.props.cards.cards} />
      )
    }
  };


};

export default connect(mapStateToProps,mapDispatchToProps)(BarDetail)
