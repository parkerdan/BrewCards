'use strict';

//React
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

// Views
import ImageArray from '../images/ImageArray';

//Styles
import { card } from '../styles/card';

export default class CardScroller extends React.Component {

  render(){

    let cards = this.props.cards.map( (opt,i) => {

      let images = [];
      for (var i = 0; i < opt.hoppiness; i++) {
        images.push(
          <View key={opt.id + 'hops' + i} style={ card.hopImage }>
            <Image source={ require('../images/hops.png') } resizeMode={'contain'}/>
          </View>
        )
      }

      return(
        <View
          key={opt.id + 'card' + i}
          style={[card.container,{
          backgroundColor: this.props.addOpacity(opt.backgroundColor),
        }]}
        >
          <View style={[card.card,{ backgroundColor: opt.backgroundColor }]}>

            <View style={ card.textContainer }>
              <Text style={[ card.titleText,{color: opt.textColor} ]}>
                {opt.title}
              </Text>
            </View>

            <View style={ [card.imageContainer,card.hopImageContainer] }>
              {images}
            </View>

            <View style={ card.imageContainer }>
              <Image source={ ImageArray[opt.imageId] }/>
            </View>

            <View style={ card.textContainer }>
              <Text style={[ card.detailText,{color: opt.textColor} ]}>
                {opt.description}
              </Text>
            </View>

          </View>
        </View>

      )
    })

    return(
      <ScrollView
        pagingEnabled={true}
        horizontal={true}>
        {cards}
      </ScrollView>
    )
  }
}
