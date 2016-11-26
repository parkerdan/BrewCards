import colors from './colors';

import { StyleSheet } from 'react-native';

export const bars = StyleSheet.create({
  rowContainer: {
    padding:12,
    flexDirection:'row',
    backgroundColor:colors.sky,
    alignItems:'center',
    borderWidth:StyleSheet.hairlineWidth,
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
  text: {
    fontSize:22,
    color: colors.watermelon,
  },
  countContainer: {
    flex:1,
    justifyContent:'center',
    alignItems: 'flex-end',
  },
  sectionHeaderContainer: {
    backgroundColor:colors.carbon,
    paddingVertical:5,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderTopWidth:StyleSheet.hairlineWidth,
    borderBottomWidth:StyleSheet.hairlineWidth,
    flexDirection: 'row'
  }

})
