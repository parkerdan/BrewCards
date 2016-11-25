'use strict';

import colors from './colors';

import { StyleSheet } from 'react-native';

export const loading = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.neutral
  },
  text: {
    fontSize:16,
    color:colors.watermelon
  },
  buttonText: {
    fontSize:16,
    color:colors.watermelon
  },
  button: {
    padding:10,
    borderRadius:5,
    backgroundColor:colors.carbon
  }
})

export const spinner = {size:'large',color:colors.watermelon}
