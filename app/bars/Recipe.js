'use strict'

//React
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { popRoute } from '../navigation/actions';

// Style
import { loading  } from '../styles/loading';
import { header, headerHeight, headerColor, backIcon } from '../styles/header';
import { card } from '../styles/card';
import colors from '../styles/colors';

//Views
import Header from 'rn-header';
import Footer from '../components/Footer';

const mapDispatchToProps = (dispatch) => {
  return {
    popRoute: () => dispatch(popRoute()),
  }
};

class Recipe extends React.Component {
  render(){
    return(
      <View style={ loading.container }>
        <Header
          backgroundColor={ headerColor }
          height={ headerHeight }

          leftIconProps={ backIcon }
          onLeftPress={ () => this.props.popRoute() }

          centerText={ 'Recipe' }
          centerTextProps={{
            style:header.centerText,
            numberOfLines:1
          }}
        />
        <ScrollView style={{flex:1}}
          contentContainerStyle={{
            padding: 20
          }}>
          <Text style={ [card.titleText,{marginVertical:10,color:colors.watermelon}] }>{this.props.title}</Text>
          <Text style={ [card.detailText,{color:colors.watermelon}] }>{this.props.recipe}</Text>
        </ScrollView>

        <Footer />
      </View>
    )
  };

};

export default connect(null,mapDispatchToProps)(Recipe)
