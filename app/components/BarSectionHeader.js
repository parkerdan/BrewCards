'use strict'

// React
import React from 'react';
import { View, Text } from 'react-native';

// Styles
import { bars } from '../styles/bars';

export default class BarSectionHeader extends React.Component {
  render(){
    let account = (this.props.count > 1) ? '-accounts':'-account';
    return(
      <View style={ bars.sectionHeaderContainer }>
        <Text style={ bars.text }>
          {this.props.title + '\'s   ' + this.props.count + account}
        </Text>
      </View>
    )
  };
};
