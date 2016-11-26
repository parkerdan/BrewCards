'use strict';

import colors from './colors';

import { StyleSheet } from 'react-native';

export const header = StyleSheet.create({
  centerText: {
    fontSize: 22,
    color: colors.watermelon,
    fontWeight:'600'
  },
  margin: {
    marginBottom:5
  }
})

export const headerHeight = 60;
export const headerColor = colors.carbon;
export const settingsIcon = {name:'cogs',size:20,color:colors.watermelon,style:header.margin};
export const backIcon = {name:'chevron-left',size:20,color:colors.watermelon, style:header.margin};
export const recipeIcon = {name:'flask',size:20, style: header.margin}
export const closeIcon = {name:'close',size:20,style:header.margin}
