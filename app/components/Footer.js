'use strict'

import React from 'react';
import { StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native';

import colors from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.carbon,
    height: 60
  },
  heading: {
    color: colors.watermelon,
    fontSize:16,
    fontWeight: '600'
  },
  text: {
    color: colors.watermelon,
    fontSize:14
  }
})

export default class Footer extends React.Component {

  linkToSite(){
    Linking.openURL("http://www.brewcards.us/").catch(err => {}).done();
  };

  render(){
    return(
      <TouchableOpacity
        onPress={ this.linkToSite }
        style={ styles.container }>
        <Text style={ styles.heading }>{'http://www.brewcards.us'}</Text>
        <Text style={ styles.text }>{'Create a FREE account!'}</Text>
        <Text style={ styles.text }>{'Design your own cards!'}</Text>
      </TouchableOpacity>
    )
  };

};
