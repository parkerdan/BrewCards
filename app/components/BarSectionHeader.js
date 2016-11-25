'use strict'

import React from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';

import colors from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.carbon,
    paddingVertical:5,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderTopWidth:1/PixelRatio.get(),
    borderBottomWidth:1/PixelRatio.get(),
    flexDirection: 'row'
  },
  text: {
    fontSize: 22,
    color: colors.watermelon,
    fontWeight: '600'
  }
});


export default class BarSectionHeader extends React.Component {
  render(){
    let account = (this.props.count > 1) ? '-accounts':'-account';
    return(
      <View style={ styles.container }>
        <Text style={ styles.text }>
          {this.props.title + '\'s   ' + this.props.count + account}
        </Text>
      </View>
    )
  };

};
