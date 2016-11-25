'use strict'

import React from 'react';
import { View, TouchableOpacity, Text, PixelRatio, StyleSheet } from 'react-native';

import colors from '../styles/colors'

const styles = StyleSheet.create({
  container: {
    padding:12,
    flexDirection:'row',
    backgroundColor:colors.sky,
    alignItems:'center',
    borderWidth:1/PixelRatio.get(),
    marginHorizontal:5,
    overflow:'hidden',
    borderRadius: 10,
    marginBottom:5,
  },
  titleContainer: {
    flex:2,
    justifyContent: 'center',
    flexWrap:'wrap',
  },
  countContainer: {
    flex:1,
    justifyContent:'center',
    alignItems: 'flex-end',
  },
  text: {
    fontSize:22,
    color: colors.watermelon,
  }
});


export default class BarRow extends React.Component {
  render(){
    let cards = (this.props.data.cardCount > 1) ? '-Cards':'-Card';
    return(
      <TouchableOpacity
        onPress={ () => console.log('do stuff')
          // () => pushRoute('BarDetail',{bar:this.props.data})
        }>
        <View style={ styles.container }>

          <View style={ styles.titleContainer }>
            <Text
              numberOfLines={3}
              style={ styles.text }>
              {this.props.data.title}
            </Text>
          </View>

          <View style={ styles.countContainer }>
            <Text
              numberOfLines={1}
              style={ styles.text }>
              {this.props.data.cardCount + cards}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };
};
