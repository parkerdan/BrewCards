'use strict'

// React
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// Styles
import { bars } from '../styles/bars';

export default class BarRow extends React.Component {
  render(){
    let cards = (this.props.data.cardCount > 1) ? '-Cards':'-Card';
    return(
      <TouchableOpacity
        style={ bars.rowContainer }
        onPress={ this.props.onPress }
      >

        <View style={ bars.titleContainer }>
          <Text
            numberOfLines={3}
            style={ bars.text }
          >
            {this.props.data.title}
          </Text>
        </View>

        <View style={ bars.countContainer }>
          <Text
            numberOfLines={1}
            style={ bars.text }
          >
            {this.props.data.cardCount + cards}
          </Text>
        </View>

      </TouchableOpacity>
    )
  };
};
