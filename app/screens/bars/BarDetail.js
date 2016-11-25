'use strict'

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
 StyleSheet,
 View,
 Dimensions,
 Text,
} from 'react-native';

import Colors from '../../styles/Colors';

const { height,width } = Dimensions.get('window');

//const propTypes = {
//  foo: React.PropTypes.string,
//};

export default class BarsDetail extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
  };

  render(){
    return(
      <View style={styles.container}>
        <Text>Bars Detail</Text>
      </View>
    )
  };

};

//Foo.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:Colors.carbon,
    alignItems:'center',
    justifyContent:'center',
  },
});
