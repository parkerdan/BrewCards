'use strict';

import { StyleSheet } from 'react-native';
import colors from './colors';

export const settings = StyleSheet.create({
  heading: {
    textAlign: 'center',
    color: colors.watermelon,
    fontSize:22,
    marginVertical: 10
  },
  optionContainer: {
    margin:5,
    overflow:'hidden',
    backgroundColor:colors.sky,
    borderRadius: 5,
    padding:10,
    flexDirection:'row',
  },
  textContainer: {
    flex:2,
    justifyContent:'center',
    paddingLeft:10,
    paddingVertical: 5,
  },
  iconContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
  },
  text: {
    color: colors.watermelon,
    fontSize: 14
  }
});

export const checkIcon = {name:'check',size:20,color:colors.watermelon}
