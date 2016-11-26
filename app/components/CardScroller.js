'use strict';

import React, { Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView
 } from 'react-native';

import ImageArray from '../images/ImageArray';
import Header from 'rn-header';

import { closeIcon } from '../styles/header';

const { height,width } = Dimensions.get('window');

export default class CardScroller extends Component {
  constructor() {
    super();

    this.state = {
      cardWidth:0,
      hopHeight: 0,
    };
  };

  addOpactiy = (rgb) => {
    var result = rgb.replace(')', ', .3)').replace('rgb', 'rgba');
    return result
  };

  render(){

    let cards = this.props.cards.map( (opt,i) => {

      let images = [];
      for (var i = 0; i < opt.hoppiness; i++) {
        images.push(
          <View key={opt.id + 'hops' + i}
            style={{width:this.state.cardWidth/10,height:this.state.hopHeight}}
          >
            <Image
              source={require('../images/hops.png')}
              resizeMode={'contain'}
            />
          </View>
        )
      }


      return(
        <View key={opt.id + 'card' + i} style={{flex:1}}>
          <Header
            backgroundColor={opt.backgroundColor}
            height={ this.props.headerHeight }
            centerText={ this.props.centerText }
            centerTextProps={ {style:[this.props.centerTextStyle,{color:opt.textColor  }],numberOfLines:1} }
            onLeftPress={ this.props.onLeftPress }
            leftIconProps={ {...closeIcon,color:opt.textColor} }

          />
          <View style={{
            height:(height - this.props.headerHeight ),
            width:width,
            backgroundColor: this.addOpactiy(opt.backgroundColor),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View
              onLayout={
                (e) => this.setState({cardWidth: (e.nativeEvent.layout.width - 10)})
              }
              style={{
                backgroundColor: opt.backgroundColor,
                width: (width * .95),
                height: ((height - 55 ) * .95),
                borderRadius: 10,
                flexDirection:'column'
              }}>
              <View style={{
                flex: 1,
                paddingVertical: 5,
                overflow:'hidden'
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 33,
                  color: opt.textColor
                }}>
                  {opt.title}
                </Text>
              </View>

              <View
                onLayout={
                  (e) => this.setState({hopHeight:(e.nativeEvent.layout.height - 4)/2})
                }
                style={{
                  flex:1,
                  paddingVertical:2,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
                {images}
              </View>

              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image
                  source={ ImageArray[opt.imageId] }
                />
              </View>

              <View style={{
                flex: 1,
                paddingVertical:5,
                overflow:'hidden',
              }}>
                <Text style={{
                  fontSize:22,
                  textAlign:'center',
                  color: opt.textColor
                }}>
                  {opt.description}
                </Text>
              </View>
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
